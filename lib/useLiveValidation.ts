'use client'
import { useState } from 'react'
import type { z } from 'zod'

export function useLiveValidation(schema: z.ZodObject, serverErrors?: Record<string, string[] | undefined>) {
  const [live, setLive] = useState<Record<string, string | undefined>>({})

  // a new server response resets live results so submit errors always show
  const [prevServer, setPrevServer] = useState(serverErrors)
  if (serverErrors !== prevServer) {
    setPrevServer(serverErrors)
    setLive({})
  }

  const validate = (name: string, value: string) => {
    const field = (schema.shape as Record<string, z.ZodType | undefined>)[name]
    if (!field) return
    // empty ("wajib diisi") is only reported on submit, not while typing
    const r = value === '' ? null : field.safeParse(value)
    setLive((prev) => ({ ...prev, [name]: !r || r.success ? undefined : r.error.issues[0].message }))
  }

  // change events bubble, so one handler on <form> covers every named input/textarea
  const onChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const t = e.target as unknown as HTMLInputElement
    if (t.name) validate(t.name, t.value)
  }

  // once a field is edited, the live result replaces the stale server error
  const error = (name: string) => (name in live ? live[name] : serverErrors?.[name]?.[0])

  return { onChange, validate, error }
}
