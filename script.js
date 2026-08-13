const form = document.getElementById("predictionForm");

const predictBtn = document.getElementById("predictBtn");

const loading = document.getElementById("loading");

const result = document.getElementById("result");

const scoreValue = document.getElementById("score");

const scoreProgress = document.getElementById("circleProgress");

const resultTitle = document.getElementById("scoreMessage");

const resultDescription =
    document.getElementById("scoreDescription");

const againBtn = document.getElementById("againBtn");

const errorBox = document.getElementById("error");


// FastAPI URL
const API_URL = "https://mindscoreai.onrender.com";


// Circle settings
const radius = 52;

const circumference = 2 * Math.PI * radius;


// Set initial circle
scoreProgress.style.strokeDasharray = circumference;
scoreProgress.style.strokeDashoffset = circumference;


// ================================
// FORM SUBMIT
// ================================

form.addEventListener("submit", async function (event) {

    event.preventDefault();


    // Disable button
    predictBtn.disabled = true;

    predictBtn.textContent = "Predicting...";


    // Show loading
    loading.classList.remove("hidden");


    // Hide old result
    result.classList.add("hidden");


    // Hide old error
    errorBox.classList.add("hidden");

    errorBox.textContent = "";


    // ================================
    // GET FORM VALUES
    // ================================

    const data = {

        Age: Number(
            document.getElementById("Age").value
        ),

        Gender:
            document.getElementById("Gender").value,

        Country:
            document.getElementById("Country").value,

        Academic_Level:
            document.getElementById("Academic_Level").value,

        Most_Used_Platform:
            document.getElementById("Most_Used_Platform").value,

        Purpose_Of_Use:
            document.getElementById("Purpose_Of_Use").value,

        Avg_Daily_Usage_Hours:
            Number(
                document.getElementById(
                    "Avg_Daily_Usage_Hours"
                ).value
            ),

        Daily_Unlocks:
            Number(
                document.getElementById(
                    "Daily_Unlocks"
                ).value
            ),

        Study_Hours:
            Number(
                document.getElementById(
                    "Study_Hours"
                ).value
            ),

        Physical_Activity_Hours:
            Number(
                document.getElementById(
                    "Physical_Activity_Hours"
                ).value
            ),

        Sleep_Hours_Per_Night:
            Number(
                document.getElementById(
                    "Sleep_Hours_Per_Night"
                ).value
            ),

        Stress_Level:
            document.getElementById(
                "Stress_Level"
            ).value
    };


    console.log(
        "Data being sent to FastAPI:",
        data
    );


    // ================================
    // SEND REQUEST
    // ================================

    try {

        const response = await fetch(
            API_URL,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );


        console.log(
            "FastAPI response status:",
            response.status
        );


        // ================================
        // HANDLE ERROR RESPONSE
        // ================================

        if (!response.ok) {

            let errorData = null;

            try {

                errorData = await response.json();

            } catch (e) {

                errorData = null;

            }


            let message =
                `Server error: ${response.status}`;


            if (errorData?.detail) {

                if (Array.isArray(errorData.detail)) {

                    message =
                        errorData.detail
                            .map(item =>
                                item.msg || JSON.stringify(item)
                            )
                            .join("\n");

                } else {

                    message =
                        String(errorData.detail);

                }

            }


            throw new Error(message);
        }


        // ================================
        // GET JSON RESPONSE
        // ================================

        const resultData =
            await response.json();


        console.log(
            "Prediction received:",
            resultData
        );


        // ================================
        // GET SCORE
        // ================================

        const score = Number(
            resultData.Predict_Mental_Health_Score
        );


        if (!Number.isFinite(score)) {

            throw new Error(
                "FastAPI returned an invalid prediction score."
            );
        }


        // ================================
        // SHOW RESULT
        // ================================

        showResult(score);


    } catch (error) {

        console.error(
            "Prediction error:",
            error
        );


        errorBox.textContent =
            "❌ " + error.message;


        errorBox.classList.remove(
            "hidden"
        );


    } finally {

        // Enable button
        predictBtn.disabled = false;

        predictBtn.textContent =
            "Predict Mental Health Score";


        // Hide loading
        loading.classList.add("hidden");
    }

});


// ================================
// SHOW RESULT
// ================================

function showResult(score) {

    // Score is out of 10
    scoreValue.textContent = score.toFixed(2);

    // Keep score between 0 and 10
    const percentage = Math.max(
        0,
        Math.min(10, score)
    );

    // Circle progress
    const circumference = 326.7;

    const offset =
        circumference -
        (percentage / 10) * circumference;

    scoreProgress.style.strokeDashoffset = offset;

    // Result message
    if (score >= 8) {

        resultTitle.textContent = "Excellent Mental Health";

        resultDescription.textContent =
            "Your predicted score indicates a positive mental health level. Keep maintaining healthy sleep, physical activity, balanced routines, and healthy digital habits.";

    } else if (score >= 6) {

        resultTitle.textContent = "Good Mental Health";

        resultDescription.textContent =
            "Your predicted score indicates a generally positive mental health level. Continue maintaining healthy routines and managing stress effectively.";

    } else if (score >= 4) {

        resultTitle.textContent = "Moderate Mental Health";

        resultDescription.textContent =
            "Your predicted score suggests that there may be some areas worth paying attention to, such as sleep, stress, physical activity, or screen time.";

    } else {

        resultTitle.textContent = "Needs Attention";

        resultDescription.textContent =
            "Your predicted score is relatively low. Consider focusing on healthy routines, adequate sleep, physical activity, and stress management.";
    }

    result.classList.remove("hidden");

    result.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// ================================
// MAKE ANOTHER PREDICTION
// ================================

againBtn.addEventListener(
    "click",
    function () {

        // Reset form
        form.reset();


        // Hide result
        result.classList.add(
            "hidden"
        );


        // Hide error
        errorBox.classList.add(
            "hidden"
        );

        errorBox.textContent = "";


        // Reset score
        scoreValue.textContent =
            "0.00";


        // Reset circle
        scoreProgress.style.strokeDashoffset =
            circumference;


        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);