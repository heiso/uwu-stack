import { useForm } from '@conform-to/react'
import { getFieldsetConstraint, parse } from '@conform-to/zod'
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
    constraint: getFieldsetConstraint(schema),
    onValidate: ({ formData }) => parse(formData, { schema }),
  })

  return (
    <Form {...form.props} method="post" className="flex flex-col gap-4 w-full">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Text" hint="This is a hint" field={fields.text} />

        <Field
          label="Input with icon"
          hint="This is a hint"
          field={fields.text2}
          icon={<Icon id="magnifying-glass" />}
        />

        <Field label="Number" hint="This is a hint" field={fields.number} type="number" />

        <PasswordField label="Password" hint="This is a hint" field={fields.password} />

        <CheckboxField label="Checkbox" hint="This is a hint" field={fields.checkbox} />

        <Switch leftLabel="Left" rightLabel="Right" />

        <SelectField label="Select" options={OPTIONS} hint="This is a hint" />

        <SelectMultipleField
          label="Multi select"
          placeholder={'Click me senpai'}
          options={OPTIONS}
          hint="This is a hint"
        />
      </div>

      <TextareaField label="Textarea" hint="This is a hint" field={fields.textarea} />

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
