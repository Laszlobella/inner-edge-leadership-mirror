export async function POST(req) {
  try {
    const { name, email, archetype } = await req.json();

    // call MailerLite
    const mlRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
    },
    body: JSON.stringify({
      email,
      name,
      fields: { archetype },      // custom field
      // groups: ['YOUR_GROUP_ID'] // optional: put contacts into a list
    }),
});

    if (mlRes.ok) return new Response('OK', { status: 200 });

    console.error('MailerLite error →', await mlRes.text());
    return new Response('MailerLite error', { status: 500 });
  } catch (err) {
    console.error(err);
    return new Response('Server error', { status: 500 });
  }
}
