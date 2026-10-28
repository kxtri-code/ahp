import { useEffect, useState } from 'react';
import { ArrowLeft, CalendarDays, Check, Download, MapPin, ShieldCheck, Ticket, Upload } from 'lucide-react';
import { addRecord, makeId, useSiteContent } from './contentStore';
import MobileDock from './MobileDock';
import './arise-register-page.css';

function AriseIdCard({ registration }) {
  const qr = `https://quickchart.io/qr?text=${encodeURIComponent(registration.attendeeId)}&size=180`;
  return <div className="arise-id-card-wrap"><div className="arise-id-card" id="arise-id-card"><div className="arise-id-card__top"><img src="/media/arise-nagaland-logo.png" alt="Arise Nagaland" /><span>OFFICIAL DELEGATE</span></div><div className="arise-id-card__body"><div><p>Arise Nagaland 2026</p><h2>{registration.name}</h2><span>{registration.passType}</span><small>{registration.church} · {registration.city}</small><strong>{registration.attendeeId}</strong></div><img src={qr} alt="Registration QR code" /></div><div className="arise-id-card__foot">Verified delegate · Carry this card at the gathering</div></div><div className="arise-id-card__actions"><button onClick={() => window.print()}><Download /> Print / save ID card</button><a href="/arise-nagaland">Return to Arise Nagaland</a></div></div>;
}

export default function AriseRegister() {
  const { arise } = useSiteContent();
  const [registration, setRegistration] = useState(null);
  const [paymentProof, setPaymentProof] = useState('');
  useEffect(() => { document.title = 'Register | Arise Nagaland'; window.scrollTo(0, 0); }, []);
  const readProof = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2_500_000) { window.alert('Please choose a payment screenshot under 2.5 MB.'); event.target.value = ''; return; }
    const reader = new FileReader();
    reader.onload = () => setPaymentProof(reader.result);
    reader.readAsDataURL(file);
  };
  const submit = (event) => {
    event.preventDefault();
    if (!paymentProof) { window.alert('Please upload your payment screenshot before submitting.'); return; }
    const data = new FormData(event.currentTarget);
    const record = { id: makeId('ARISE'), createdAt: new Date().toISOString(), name: data.get('name'), email: data.get('email'), phone: data.get('phone'), city: data.get('city'), church: data.get('church'), passType: data.get('passType'), ageGroup: data.get('ageGroup'), emergency: data.get('emergency'), notes: data.get('notes'), paymentProof, paymentStatus: 'pending', status: 'pending', attendeeId: null, verifiedAt: null };
    addRecord('ariseRegistrations', record);
    setRegistration(record);
  };
  return <div className="arise-signup"><header><a href="/arise-nagaland"><ArrowLeft /> Back to Arise</a><div className="arise-signup__brand"><img src="/media/arise-nagaland-logo.png" alt="Arise Nagaland" /></div><a href="/">AHP home</a></header><main><section className="arise-signup__intro"><p>Delegate registration</p><h1>Come ready<br /><em>to arise.</em></h1><span>{arise.registrationNote}</span><div><small><CalendarDays />{arise.date}</small><small><MapPin />{arise.venue}</small></div></section><section className="arise-signup__form">{!arise.registrationOpen ? <div className="arise-signup__closed"><Ticket /><h2>Registration is currently closed.</h2><p>Please return to the event page and join the early-interest list for announcements.</p><a href="/arise-nagaland">Return to event page</a></div> : registration ? <div className="arise-signup__success"><span><Check /></span><p>Thank you for registering.</p><h2>Your details are safely with the Arise team.</h2><div><small>Registration reference</small><strong>{registration.id}</strong></div><p>Your payment screenshot has been received and is awaiting verification. Once the team confirms it, your official Arise ID card will be issued here.</p>{registration.attendeeId && <AriseIdCard registration={registration} />}<button onClick={() => window.print()}>Print confirmation</button><a href="/arise-nagaland">Return to Arise Nagaland</a></div> : <form onSubmit={submit}><div><p>Registration form</p><h2>Reserve your place.</h2><span>Complete the details below. Fields marked with * are required.</span></div><div className="arise-signup__fields"><label>Full name *<input name="name" required autoComplete="name" /></label><label>Email address *<input name="email" type="email" required autoComplete="email" /></label><label>Phone / WhatsApp *<input name="phone" type="tel" required autoComplete="tel" /></label><label>City / district *<input name="city" required /></label><label>Church / organisation *<input name="church" required /></label><label>Age group *<select name="ageGroup" required defaultValue=""><option value="" disabled>Select</option><option>Under 18</option><option>18–24</option><option>25–34</option><option>35–49</option><option>50+</option></select></label><label>Registration type *<select name="passType" required defaultValue=""><option value="" disabled>Select</option><option>Individual delegate</option><option>Church group</option><option>Pastor / ministry leader</option><option>Volunteer</option><option>Mission partner</option></select></label><label>Emergency contact *<input name="emergency" required placeholder="Name and phone number" /></label><label className="arise-signup__wide">Anything the team should know?<textarea name="notes" rows="4" placeholder="Accessibility, dietary or group information" /></label><div className="arise-payment arise-signup__wide"><div><p>Registration payment</p><h3>Pay with UPI</h3><span>Scan the QR with any UPI app, then upload your payment screenshot.</span><img src="/media/arise-payzapp-qr.jpg" alt="Arise Nagaland PayZapp QR code" /></div><label className="arise-payment__upload"><Upload /> Payment screenshot *<input type="file" accept="image/*" required onChange={readProof} /><small>{paymentProof ? 'Screenshot attached ✓' : 'JPG or PNG · max 2.5 MB'}</small>{paymentProof && <img src={paymentProof} alt="Payment preview" />}</label></div><label className="arise-signup__consent arise-signup__wide"><input type="checkbox" required /><span><Check /></span><small>I confirm that these details are correct and consent to the Arise Nagaland team contacting me about this registration.</small></label><button className="arise-signup__wide">Submit registration <Ticket /></button><p className="arise-signup__privacy arise-signup__wide"><ShieldCheck />Your information is used only for event administration in this demo.</p></div></form>}</section></main><MobileDock active="Arise" /></div>;
}
