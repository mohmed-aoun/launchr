(function () {
  const SHEETS_ENDPOINT = import.meta?.env?.NEXT_PUBLIC_SHEETS_ENDPOINT
    || window.NEXT_PUBLIC_SHEETS_ENDPOINT;

  if (!SHEETS_ENDPOINT) {
    console.error('❌ Sheets endpoint not found');
    return;
  }

  const params = new URLSearchParams(window.location.search);

  const bookingData = {
    invitee_name: params.get('invitee_name'),
    invitee_email: params.get('invitee_email'),
    event_type: params.get('event_type_name'),
    event_start: params.get('event_start_time'),
    affiliate_ref: localStorage.getItem('affiliate_ref') || 'direct',
    booked_at: new Date().toISOString(),
    secret: 'launchr_v1_2024'
  };

  fetch(SHEETS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  })
    .then(res => res.json())
    .then(() => console.log('✅ Logged to Sheets'))
    .catch(err => console.error('❌ Sheet logging failed', err));
})();
