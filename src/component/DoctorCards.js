 
const intro1 = `<p><strong>Dr. Dinesh Jain</strong> is specialist in  Oral and Maxillofacial surgery. He attended  Oxford Dental College  Hospital in Bengaluru where he gained his Bachelor of Dental Surgery degree.  He continued his education and earned his master of Dental Surgery degree at the Rajiv Gandhi University of Health Sciences,Karnataka.</p><p>He is best dental surgeon in Rajasthan Region. He cleared his Postgraduate entrance exams by securing 7th rank in 2003. He joined for 3 years training in SDM collegeof Dental sciences Dharwad, Karnataka (5 stars NACC accredited institution) in Oral and Maxillofacial Surgery. He is registered under KDC No. A-13114.</p>
<p>Dr. Dinesh practices a full scope of  Oral and Maxillofacial Surgery, with an emphasis on facial trauma, Cleft lip and palate Surgery, TMJ surgery, Orthognathic Surgery, Bone augmentation, dental implants and jaw reconstruction.</p> <p>Dr. Dinesh also served as reader (associate professor) in department of oral and maxillofacial surgery, Mahatma Gandhi Dental College and Hospital, Jaipur for 04 years till 2011. He was visiting Consultant in various corporate hospital and private clinics in Jaipur, Kota, Sikar, Churu, and Dausa in Rajasthan region. He worked in Ministry of Health, Abha region, KSA in a JCI accredited, Trauma and Regional Multispecialty hospital, Maxillofacial Department from 2011 to 2015.</p>`;

const intro2 = `<p>Dr. Jyoti Jain is a leading anesthesia specialist and is currently working with Narayana Multispeciality Hospital. She has over 11 years of rich professional experience having worked at Fortis Hospital, Santokba Durlabhji Memorial Hospitl, Bhagwan Mahaveer Cancer Hospital & Research Centre and Mahatma Gandhi Hospital Jaipur.</p> 
<p>She was honored by Ministry of Health, Asir region, KSA for her exceptional contribution for saving life of a complicated pregnant patient. She is a graduate from Rajiv Gandhi University of Health Sciences, Karnataka. She has successfully completed Diplomate in National Board in anesthesiology, 2010 and registered under Rajasthan Medical Council. She completed her MBBS from AIMS Bellur and Diploma in anesthesiology from JSS medical college Mysore, 2007.</p>
<p>She is keen on giving good pain relief, a soft anesthetic conduct and a good post-procedural care. Her special interest lies in giving anesthesia to medically high risk patient, organ transplant patient, conscious sedation with best anesthesia conduct and care to patient.</p>`;

const doctors = [
  {
    name: "Dr. Dinesh Kumar Jain",
    title: "Dentist",
    image: "/images/dinesh_kumar.jpg",
    description:  intro1, },
  {
    name: "Dr. Jyothi Jain",
    title: "Multispecialist",
    image: "/images/Jyothi-Jain.jpg",
    description:  intro2,},
  // Add more doctors as needed
];

const DoctorCards = () => {
  
  return (
      <div className="flex flex-col gap-8 mt-10 items-center justify-center">
    {doctors.map((doc, idx) => (
      <div
        key={idx}
          className="bg-[#FDF3C4] rounded-2xl shadow-lg max-w-2xl w-full p-6 sm:p-8 flex flex-col items-center border-2 border-[#b8860b] hover:shadow-2xl transition text-center"
      >
        <img
          src={doc.image}
          alt={doc.name}
            className="max-w-32 sm:max-w-40 max-h-32 sm:max-h-40 object-cover rounded-full border-4 border-[#800000] mb-4 shadow mx-auto"
        />
        <h3 className="text-lg sm:text-xl font-bold text-[#800000]">{doc.name}</h3>
          <p className="text-[#b8860b] font-semibold mb-2 text-sm sm:text-base">{doc.title}</p>
          {doc.description.startsWith("<") ? (
            <div
              className="text-[#5B1A13] text-sm sm:text-base mt-2 space-y-2 text-justify"
              dangerouslySetInnerHTML={{ __html: doc.description }}
            />
          ) : (
            <p className="text-[#5B1A13] text-sm sm:text-base mt-2">{doc.description}</p>
          )}
          </div>
    ))}
  </div>
)};

export default DoctorCards;