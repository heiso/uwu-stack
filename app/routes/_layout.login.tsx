import { useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
import { Form, useActionData } from '@remix-run/react'
import { z } from 'zod'
import { Field, PasswordField } from '../components/field.tsx'
import { Button } from '../ui/button.tsx'
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
    <div className="flex flex-col items-center gap-6">
      <Logo />
      <Form {...form.props}>
        <Field
          label="Email"
          autoComplete="email"
          field={fields.email}
          type="email"
          icon={<span>@</span>}
        />

        <PasswordField label="Password" field={fields.password} />

        <Button primary type="submit" className="w-full">
          Login
        </Button>
      </Form>
    </div>
  )
}
