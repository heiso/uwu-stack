// import { useForm } from '@conform-to/react'
// import { getFieldsetConstraint, parse } from '@conform-to/zod'
// import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/node'
// import { Form, useActionData } from '@remix-run/react'
// import { z } from 'zod'
// import { routerPaths } from '../../routes.ts'
// import { assertAnonymous } from '../auth.server.ts'
// import { CheckboxField, Field, PasswordField } from '../components/field.tsx'
import { Logo } from '../components/logo.tsx'
// import { sendMail } from '../email.server.ts'
// import { generateAndStoreOTP } from '../one-time-password.server.ts'
// import { generateHash } from '../password.server.ts'
// import { prisma } from '../prisma.server.ts'
// import { isRateLimited } from '../rate-limiter.server.ts'
// import { getRedirectPath, getURLWithRedirectTo } from '../redirect-to.server.ts'
// import { Button } from '../ui/button.tsx'
// import { Hint } from '../ui/hint.tsx'
// import { email } from '../validations.ts'

// const schema = z.object({
//   email: email,
//   password: z.string(),
//   accept: z.boolean(),
// })

// export async function action({ request, context }: ActionFunctionArgs) {
//   await assertAnonymous(request)

//   const formData = await request.formData()
//   const submission = parse(formData, { schema })

//   if (submission.intent === 'submit' && submission.value) {
//     const isEmailUsed = await prisma.user.count({ where: { email: submission.value.email } })

//     // Email enumeration: the attacker can take his time, therefore another counter measure is necessary
//     const isLimited = await isRateLimited('signup-by-ip', context.ip)

//     if (isEmailUsed || isLimited) {
//       submission.error.email = ['Cette adresse email est déjà utilisée']
//       return json(submission, { status: 400 })
//     }

//     const email = submission.value.email
//     const hashedPassword = generateHash(submission.value.password)

//     const user = await prisma.$transaction(async (prisma) => {
//       const user = await prisma.user.create({
//         data: {
//           email,
//           hashedPassword,
//         },
//         select: {
//           email: true,
//         },
//       })

//       // const customer = await stripe.customers.create({
//       //   email: user.email,
//       //   metadata: { organizationId: user.organizationId },
//       // })

//       return user
//     })

//     generateAndStoreOTP(user.email).then((code) => {
//       const url = new URL(
//         routerPaths['/otp/verify/:code?/:email']({
//           code,
//           email: user.email,
//         }),
//         process.env.PUBLIC_URL,
//       )
//       url.search = new URL(request.url).searchParams.toString()

//       return sendMail({
//         to: user.email,
//         subject: `${code} - Confirmez votre email`,
//         react: <LoginByCodeMail code={code} url={url.toString()} />,
//       })
//     })

//     return redirect(
//       getURLWithRedirectTo(
//         routerPaths['/signup/otp/verify/:code?/:email']({ email: user.email }),
//         getRedirectPath(request),
//       ),
//     )
//   }

//   return json(submission)
// }

// export async function loader({ request }: LoaderFunctionArgs) {
//   await assertAnonymous(request)

//   return null
// }

export default function Index() {
  // const lastSubmission = useActionData<typeof action>()
  // const [form, fields] = useForm({
  //   lastSubmission,
  //   shouldValidate: 'onBlur',
  //   constraint: getFieldsetConstraint(schema),
  //   onValidate: ({ formData }) => parse(formData, { schema }),
  // })

  return (
    <div className="h-full flex flex-col md:flex-row justify-center items-center gap-20">
      <Logo />
      Not implemented yet
      {/* <Form {...form.props} method="POST" className="grid gap-2">
        <Field
          placeholder="senpai@uwu.com"
          label="Email"
          autoComplete="email"
          field={fields.email}
          type="email"
          icon={<span>@</span>}
        />

        <PasswordField label="Password" autoComplete="new-password" field={fields.password} />

        <CheckboxField label="I confirm I like pink" field={fields.accept} />

        <Button primary type="submit" className="w-full">
          Signup
        </Button>
        <Hint className="mx-auto" error={form.error} />
      </Form> */}
    </div>
  )
}
