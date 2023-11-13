// import { useForm } from '@conform-to/react'
// import { getFieldsetConstraint, parse } from '@conform-to/zod'
// import { json, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from '@remix-run/node'
// import { Form, useActionData } from '@remix-run/react'
// import { z } from 'zod'
// import { routerPaths } from '../../routes.ts'
// import { assertAnonymous } from '../auth.server.ts'
// import { Field, PasswordField } from '../components/field.tsx'
import { Logo } from '../components/logo.tsx'
// import { fakePasswordTest, safeCompare } from '../password.server.ts'
// import { prisma } from '../prisma.server.ts'
// import { isRateLimited } from '../rate-limiter.server.ts'
// import { getRedirectPath } from '../redirect-to.server.ts'
// import { commitSession, getSession } from '../session.server.ts'
// import { Button } from '../ui/button.tsx'
// import { Hint } from '../ui/hint.tsx'
// import { Link } from '../ui/link.tsx'
// import { email } from '../validations.ts'

// const schema = z.object({
//   email: email,
//   password: z.string(),
//   test: z.array(z.string()).min(1, 'Pick at least one you filthy weeb'),
// })

// const errorMessage = 'Invalid email or password'

// export async function action({ request, context }: ActionFunctionArgs) {
//   await assertAnonymous(request)

//   const formData = await request.formData()
//   const submission = parse(formData, { schema })
//   console.log(submission.value?.test)

//   if (submission.intent === 'submit' && submission.value) {
//     if (await isRateLimited('login-by-ip', context.ip)) {
//       fakePasswordTest()
//       return json({ ...submission, error: { '': [errorMessage] } }, { status: 400 })
//     }
//     const user = await prisma.user.findFirst({
//       where: { email: submission.value.email },
//       select: {
//         id: true,
//         hashedPassword: true,
//         isEmailValidated: true,
//         email: true,
//       },
//     })

//     if (!user || !user?.hashedPassword) {
//       fakePasswordTest()
//       return json({ ...submission, error: { '': [errorMessage] } }, { status: 400 })
//     }

//     if (!safeCompare(submission.value.password, user.hashedPassword)) {
//       return json({ ...submission, error: { '': [errorMessage] } }, { status: 400 })
//     }

//     // if (!user.isEmailValidated) {
//     //   if (await isRateLimited('askForOTP-by-email', user.email, 3)) {
//     //     return json(submission)
//     //   }

//     //   generateAndStoreOTP(user.email).then((code) => {
//     //     const url = new URL(
//     //       routerPaths['/otp/verify/:code?/:email']({
//     //         code,
//     //         email: user.email,
//     //       }),
//     //       process.env.PUBLIC_URL,
//     //     )
//     //     url.search = new URL(request.url).searchParams.toString()

//     //     return sendMail({
//     //       to: user.email,
//     //       subject: `${code} - Confirmez votre email`,
//     //       react: <LoginByCodeMail code={code} url={url.toString()} />,
//     //     })
//     //   })

//     //   return redirect(routerPaths['/signup/otp/verify/:code?/:email']({ email: user.email }))
//     // }

//     const session = await getSession(request.headers.get('Cookie'))
//     session.set('userId', user.id)

//     return redirect(getRedirectPath(request) || routerPaths['/'], {
//       headers: {
//         'Set-Cookie': await commitSession(session),
//       },
//     })
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
  //   shouldValidate: 'onInput',
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

        <PasswordField label="Password" autoComplete="current-password" field={fields.password} />

        <Button primary type="submit" className="w-full">
          Login
        </Button>
        <Hint className="mx-auto" error={form.error} />

        <Link className="mx-auto" to={routerPaths['/signup']}>
          I don't have an account yet
        </Link>
      </Form> */}
    </div>
  )
}
