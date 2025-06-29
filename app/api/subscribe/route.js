export async function POST(req) {
  try {
    const { email, name, archetype } = await req.json();

    // map each archetype ➜ MailerLite group ID
    const groupIds = {
      Firefighter:'158540157112288456',
      Lighthouse:'158540147818759242',
      Phoenix:'158540129844069826',
      Strategist:'158540111052539100',
      Seeker:'158542660724852484',
    };

    const groupId = groupIds[archetype];
    if (!groupId) {
      return new Response(JSON.stringify({ error: 'Invalid archetype' }), { status: 400 });
    }

    // add / update subscriber in the right group
    const mlRes = await fetch(
      `https://api.mailerlite.com/api/v2/groups/${groupId}/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY,   // NO "!" here
        },
        body: JSON.stringify({ email, name }),
      }
    );

    if (!mlRes.ok) {
      const err = await mlRes.text();
      console.error('MailerLite error →', err);
      return new Response(JSON.stringify({ error: 'MailerLite error', details: err }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
