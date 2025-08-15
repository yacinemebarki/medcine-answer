 function showError(message) {            
    const errorDiv = document.querySelector('.error-message');
    errorDiv.innerHTML = `
    ${message}
    <button class="message-close" onclick="hideMessage('.error-message')">&times;</button>
    `;
    errorDiv.classList.add('show');
    setTimeout(() => {
        hideMessage('.error-message');
    }, 5000);
}
function hideMessage(selector) {
    const messageDiv = document.querySelector(selector);
    messageDiv.classList.remove('show');
}

document.getElementById("submitBtn").addEventListener("click",async function () {
    event.preventDefault();
    question=document.getElementById("medicalQuestion").value;
    if (!question){
        showError("Please enter a question");
        return;
    }
    try{
        const response=await fetch("/medical",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                question:question
            })
        });
        const data=await response.json();
        if (data.data=="On this Page General Information about VISA/VRSA What is Staphylococcus aureus? How do VISA and VRSA get their names? What should a patient do if they suspect they have a Staph, MRSA, VISA, or VRSA infection? Are VISA and VRSA infections treatable? How can the spread of VISA and VRSA be prevented? What should a person do if a family member or close friend has VISA or VRSA? What is CDC doing to address VISA and VRSA? Recommendations and Guidelines General Information about VISA/VRSA For more images of this bacterium, search the Public Health Image Library Vancomycin [van−kō−mī−sin]-intermediate Staphylococcus aureus [staff−u−lu−kaw−kus  aw−ree−us] (also called VISA) and Vancomycin-resistant Staphylococcus aureus (also called VRSA) are specific types of antimicrobial-resistant bacteria. However, as of October 2010, all VISA and VRSA isolates have been susceptible to other Food and Drug Administration (FDA)-approved drugs. Persons who develop this type of staph infection may have underlying health conditions (such as diabetes and kidney disease), tubes going into their bodies (such as catheters), previous infections with methicillin-resistant Staphylococcus aureus (MRSA), and recent exposure to vancomycin and other antimicrobial agents. What is Staphylococcus aureus? Staphylococcus aureus is a bacterium commonly found on the skin and in the nose of about 30% of individuals. Most of the time, staph does not cause any harm. These infections can look like pimples, boils, or other skin conditions and most are able to be treated. Sometimes staph bacteria can get into the bloodstream and cause serious infections which can be fatal, including: Bacteremia or sepsis when bacteria spread to the bloodstream usually as a result of using catheters or having surgery. Pneumonia which predominantly affects people with underlying lung disease including those on mechanical ventilators. Endocarditis (infection of the heart valves) which can lead to heart failure. Osteomyelitis (bone infection) which can be caused by staph bacteria traveling in the bloodstream or put there by direct contact such as following trauma (puncture wound of foot or intravenous (IV) drug abuse). Top of page How do VISA and VRSA get their names? Staph bacteria are classified as VISA or VRSA based on laboratory tests. Laboratories perform tests to determine if staph bacteria are resistant to antimicrobial agents that might be used for treatment of infections. For vancomycin and other antimicrobial agents, laboratories determine how much of the agent it requires to inhibit the growth of the organism in a test tube. The result of the test is usually expressed as a minimum inhibitory concentration (MIC) or the minimum amount of antimicrobial agent that inhibits bacterial growth in the test tube. Therefore, staph bacteria are classified as VISA if the MIC for vancomycin is 4-8µg/ml, and classified as VRSA if the vancomycin MIC is ≥16µg/ml. Top of page What should a patient do if they suspect they have a staph, MRSA, VISA, or VRSA infection? See a healthcare provider. Top of page Are VISA and VRSA infections treatable? Yes. As of October 2010, all VISA and VRSA isolates have been susceptible to several Food and Drug Administration (FDA)-approved drugs. Top of page How can the spread of VISA and VRSA be prevented? Use of appropriate infection control practices (such as wearing gloves before and after contact with infectious body substances and adherence to hand hygiene) by healthcare personnel can reduce the spread of VISA and VRSA. Top of page What should a person do if a family member or close friend has VISA or VRSA? VISA and VRSA are types of antibiotic-resistant staph bacteria. Therefore, as with all staph bacteria, spread occurs among people having close physical contact with infected patients or contaminated material, such as bandages. Persons having close physical contact with infected patients while they are outside of the healthcare setting should: (1) keep their hands clean by washing thoroughly with soap and water, and (2) avoid contact with other people's wounds or material contaminated from wounds. If they go to the hospital to visit a friend or family member who is infected with VISA or VRSA , they must follow the hospital's recommended precautions. Top of page What is CDC doing to address VISA and VRSA? In addition to providing guidance for clinicians and infection control personnel, CDC is also working with state and local health agencies, healthcare facilities, and clinical microbiology laboratories to ensure that laboratories are using proper methods to detect VISA and VRSA. Top of page Recommendations and Guidelines CDC issued a Clinical Reminder, in 2010, which serves as a reminder about the important role of clinical laboratories in the diagnosis of VRSA cases to ensure prompt recognition, isolation, and management by infection control personnel. Investigation and Control of Vancomycin-Resistant Staphylococcus aureus (VRSA) [PDF - 300 KB] - This document is a guide to conducting a public health investigation of patients from whom vancomycin-resistant Staphylococcus aureus (VRSA, vancomycin MIC ≥ 16 µg/ml) has been isolated. The information reflects the experience gained from field investigations of the first fourteen VRSA identified in the United States. Top of page")
            {
            showError("Don’t make spelling mistakes")
            return;
        }
        else {
            document.querySelector('.the-answer').innerHTML = data.data;
        }
        
    }catch(error){
        showError("Something went wrong")
    }
    
    
})

