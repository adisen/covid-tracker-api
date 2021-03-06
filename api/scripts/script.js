const getTestResults = (inputData)=>{
    let rsl = inputData.rsl;
    let outputData = {
        user_detail : getUserDetails(about),
        risk_status: rslTest(rsl),
        covid_status : covidTest(cvd).covidStatus,
        covid_tip : covidTest(cvd).covidTip,
        test_date : Date.now,
        input:inputData,
    };
    return outputData;
}


// let outputData = {
//     risk_status: "",
//     covid_status : "",
//     testing_grp : "",
// };

// variables
// let riskStatus = outputData.risk_status;
// let covidStatus = outputData.covid_status;

// let tip = "";


// logic...
// if any rsl = 1, outputData.risk_status = 'High Risk'
// outputData.risk_status = 'High Risk' + any cvd , proceed to test


// get unique ID
const getUID = () => {
    return Math.random().toString(36).substring(2, 15);
};

// get user details
// returns JSON bject called user_details
const setUserDetails = (inputData,gen_flag) =>{
    let about = inputData;
    let user_details = {};
    // gen_flag determines whether to genrate new UID r not. 
    // if set to 0, former UID is fetched form existing records...
    // else, generate new UID using the getUID function.
    // work in progress
    if (gen_flag === 0) {
            user_details = {
            name : about.name,
            phone : about.phone,
            year : about.year,
            sex : about.sex,
            state : about.state,
            city : about.city,
            streetname : about.streetname,
            occupation : about.occupation,
            question : about.question,
        };
    } else {
        
            user_details = {
            name : about.name,
            phone : about.phone,
            year : about.year,
            sex : about.sex,
            state : about.state,
            city : about.city,
            streetname : about.streetname,
            occupation : about.occupation,
            question : about.question,
            userID : getUID(),
            };
    }
    return user_details;
};
// cvd_probable test
const getCVDResult = (inputData) =>{
    let cvd = inputData;
    let covidStatus = "";
    let covidTip = "";
    if (
        (cvd.cvd_q_short_breath == 1 || 
        cvd.cvd_q_cough  == 1 || 
        cvd.cvd_q_difficult_breath  == 1 ||
        cvd.cvd_q_chest_pain  == 1) && 
        cvd.cvd_q_contact_case == 1 )
        {
            covidStatus = 'Covid-19 Probable';
            covidTip = 'Visit the nearest test center';
        }
        else
        if (
            (cvd.cvd_q_short_breath == 1 || 
            cvd.cvd_q_cough  == 1 || 
            cvd.cvd_q_difficult_breath  == 1 ||
            cvd.cvd_q_chest_pain  == 1) && 
            cvd.cvd_q_contact_case == 0 )
            {
            covidStatus = 'Covid-19 Improbable';
            covidTip = 'Observe 14 days isolation';
        }
    if(
        cvd.cvd_q_runny_nose == 1 ||
        cvd.cvd_q_sore_throat == 1 ||
        cvd.cvd_q_malaise == 1 ||
        cvd.cvd_q_headache == 1 ||
        cvd.cvd_q_ear_pain == 1)
        {
            covidStatus = 'Covid-19 Improbable';
            covidTip = 'Stay at home and self-isolate for minimum of 14 days';
        }
    else{
        
    }
    return {covid_status : covidStatus,
            covid_tip: covidTip};
};


// rsl test...
const getRSLResult = (inputData) => {
let riskStatus = "";
let rsl = inputData;
if (rsl.q1_lung ||
    rsl.q2_smoke ||
    rsl.q3_kidney ||
    rsl.q4_health ||
    rsl.q5_heart ||
    rsl.q6_diabetes ||
    rsl.q7_cancer_now ||
    rsl.q8_cancer_past ||
    rsl.q9_immunosuppressive ||
    rsl.q10_aspirin ||
    rsl.q11_health_issues.answer == 1) {    
        riskStatus = 'High Risk';
    } else{
    riskStatus = 'Low Risk';
}
return {risk_status : riskStatus};
};
// outputData.testing_grp = "Priority Test Group";
///////////////////////////////////////////////////

// sample of input Data..
let inpData = { 

    about :
    {
    name : "",
    phone : "",
    year : "",
    sex : "",
    state : "",
    city : "",
    streetname : "",
    occupation : "",
    question : "",

    },
    rsl : 
    {
    q1_lung:0,
    q2_smoke:0,
    q3_kidney:0,
    q4_health:0,
    q5_heart :  0,
    q6_diabetes:0,
    q7_cancer_now :0,
    q8_cancer_past : 0,
    q9_immunosuppressive : 0,
    q10_aspirin : 0,
    q11_health_issues : {
        answer : 0,
        description : ""
    }
    },
    covid : 
    {
    cvd_test:1,
    cvd_status:0,
    cvd_condition:"",
    cvd_q_short_breath : 0,
    cvd_q_fever : 0,
    cvd_q_cough : 0,
    cvd_q_chest_pain : 0,
    cvd_q_sore_throat : 0,
    cvd_q_difficult_breath : 0,
    cvd_q_contact_case : 0,
    cvd_q_runny_nose : 0,
    cvd_q_ear_pain : 0,
    cvd_q_diarrhea : 0,
    cvd_q_headache : 0,
    cvd_q_malaise : 0,
    cvd_q_loss_of_smell : 0,
    cvd_q_loss_of_taste : 0,
    cvd_others : "",
    }
}

// console.log(JSON.stringify(inpData))
//////////////////////////////////////////////////////
const tags = {getRSLResult,getCVDResult,setUserDetails,getUID}
module.exports = tags ;