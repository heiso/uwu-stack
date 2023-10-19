import { useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { Form, useActionData } from '@remix-run/react'
import { z } from 'zod'
import { Field, PasswordField } from '../components/field.tsx'
import { Logo } from '../ui/logo.tsx'
import { email } from '../validations.ts'

const schema = z.object({
  email: email,
  password: z.string(),
})

export function action() {}

export default function Index() {
  const lastSubmission = useActionData<typeof action>()
  const [form, fields] = useForm({
    lastSubmission,
    shouldValidate: 'onInput',
    constraint: getFieldsetConstraint(schema),
    onValidate: ({ formData }) => parse(formData, { schema }),
  })

  return (
    <>
      <Logo />
      <Form {...form.props}>
        <Field
          label="Email"
          autoComplete="email"
          field={fields.email}
          type="email"
          icon={<span>c</span>}
        />

        <PasswordField label="Password" field={fields.password} />
      </Form>
    </>
  )
}
