export async function sendMail({
  to,
  subject,
  content,
  from,
}: {
  to: string
  subject: string
  content: string
  from?: string
}) {
  try {
    console.log(content)
  } catch (error) {
    console.error(error)
  }
}
