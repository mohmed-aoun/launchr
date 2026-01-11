(function () {
  const meta = document.querySelector('meta[name="sheets-endpoint"]');
  const endpoint = meta && meta.content;

  if (!endpoint) {
    console.error('❌ Sheets endpoint missing');
    return;
  }

  const params = new URLSearchParams(window.location.search);

  const payload = {
    secret: 'launchr_v1_2024',

    invitee_name:
      params.get('invitee_full_name') ||
      `${params.get('invitee_first_name') || ''} ${params.get('invitee_last_name') || ''}`.trim(),

    invitee_email: params.get('invitee_email'),
    event_type: params.get('event_type_name'),
    event_start: params.get('event_start_time'),

    affiliate_ref:
      params.get('utm_campaign') || localStorage.getItem('affiliate_ref') || 'direct',

    booked_at: new Date().toISOString(),
    status: 'pending'
  };

  // 🔥 Fire-and-forget form submit (NO CORS)
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = endpoint;
  form.target = 'hidden_iframe';
  form.style.display = 'none';

  Object.entries(payload).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value;
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();

  console.log('✅ Booking sent to Sheets (fire-and-forget)');
})();
