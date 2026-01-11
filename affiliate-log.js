(function () {
  const meta = document.querySelector('meta[name="sheets-endpoint"]');
  const SHEETS_ENDPOINT = meta && meta.content;

  if (!SHEETS_ENDPOINT) {
    console.error('❌ Sheets endpoint missing');
    return;
  }

  const params = new URLSearchParams(window.location.search);

  const data = new URLSearchParams({
    invitee_name: params.get('invitee_name') || '',
    invitee_email: params.get('invitee_email') || '',
    event_type: params.get('event_type_name') || '',
    event_start: params.get('event_start_time') || '',
    affiliate_ref: localStorage.getItem('affiliate_ref') || 'direct',
    booked_at: new Date().toISOString(),
    secret: 'launchr_v1_2024'
  });

  fetch(SHEETS_ENDPOINT, {
    method: 'POST',
    body: data
  })
    .then(() => console.log('✅ Booking logged to Sheets'))
    .catch(err => console.error('❌ Sheet logging failed', err));
})();
