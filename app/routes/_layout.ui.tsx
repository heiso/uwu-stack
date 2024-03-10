import { getFormProps, getInputProps, getTextareaProps, useForm } from '@conform-to/react'
import { getZodConstraint, parseWithZod } from '@conform-to/zod'
import type { ActionFunctionArgs } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { z } from 'zod'
import { iconsSvgs } from '../../svgs.ts'
import {
  CheckboxField,
  Field,
  PasswordField,
  SelectField,
  SelectMultipleField,
  TextareaField,
} from '../components/field.tsx'
import { Button } from '../ui/button.tsx'
import { Icon } from '../ui/icon.tsx'
import { Link } from '../ui/link.tsx'
import { Switch } from '../ui/switch.tsx'

const OPTIONS = [
  { label: 'red', value: 0 },
  { label: 'green', value: 1 },
  { label: 'blue', value: 2 },
  { label: 'pink', value: 3 },
]

const schema = z.object({
  text: z.string(),
  text2: z.string(),
  number: z.number(),
  password: z.string(),
  checkbox: z.boolean().optional(),
  textarea: z.string(),
})

export async function action({ request }: ActionFunctionArgs) {
  console.log((await request.formData()).getAll('colors'))
  return null
}

export default function Index() {
  const [form, fields] = useForm({
    shouldValidate: 'onInput',
    constraint: getZodConstraint(schema),
    onValidate: ({ formData }) => parseWithZod(formData, { schema }),
  })

  return (
    <Form {...getFormProps(form)} method="post" className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-2 gap-4">
        <Field
          label="Text"
          hint="This is a hint"
          {...getInputProps(fields.text, { type: 'text' })}
        />

        <Field
          label="Input with icon"
          hint="This is a hint"
          icon={<Icon id="magnifying-glass" />}
          {...getInputProps(fields.text2, { type: 'text' })}
        />

        <Field
          label="Number"
          hint="This is a hint"
          {...getInputProps(fields.number, { type: 'number' })}
        />

        <PasswordField
          label="Password"
          hint="This is a hint"
          {...getInputProps(fields.password, { type: 'password' })}
        />

        <CheckboxField
          label="Checkbox"
          hint="This is a hint"
          {...getInputProps(fields.checkbox, { type: 'checkbox' })}
        />

        <Switch leftLabel="Left" rightLabel="Right" />

        <SelectField label="Select" options={OPTIONS} hint="This is a hint" />

        <SelectMultipleField
          label="Multi select"
          placeholder={'Click me senpai'}
          options={OPTIONS}
          hint="This is a hint"
        />
      </div>

      <TextareaField
        label="Textarea"
        hint="This is a hint"
        {...getTextareaProps(fields.textarea)}
      />

      <div className="grid grid-cols-2 gap-4">
        <Button primary>Primary</Button>
        <Button to="#" as="link" primary>
          Primary Link
        </Button>
        <Button>Secondary</Button>
        <Button to="#" as="link">
          Secondary Link
        </Button>
      </div>

      <Link to="#">This is a link</Link>

      <div className="flex flex-row flex-wrap gap-4 fill-gray-200">
        {iconsSvgs.map((icon) => (
          <Icon key={icon} id={icon} className="h-6 w-6" />
        ))}
      </div>
    </Form>
  )
}
