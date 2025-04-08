// ------------DIGITAL CLOCK--------------------------
// Function to update the digital clock in real-time
function updateClock() {
  const now = new Date(); // Get the current date and time
  let hours = now.getHours(); // Extract the hour from the current time
  const minutes = now.getMinutes(); // Extract the minutes from the current time
  const seconds = now.getSeconds(); // Extract the seconds from the current time
  const ampm = hours >= 12 ? "PM" : "AM"; // Determine whether it is AM or PM

  // Convert 24-hour time to 12-hour format
  hours = hours % 12 || 12; // If hours is 0, set it to 12 (for 12-hour clock format)

  // Add leading zeros to hours, minutes, and seconds if they are single digits
  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  // Update the DOM elements with the current time values
  document.getElementById("hours").textContent = formatTime(hours);
  document.getElementById("minutes").textContent = formatTime(minutes);
  document.getElementById("seconds").textContent = formatTime(seconds);
  document.getElementById("ampm").textContent = ampm; // Update AM/PM indicator
}

// Call the updateClock function every second to keep the clock updated
setInterval(updateClock, 1000);

// Initialize the clock immediately to display the current time without waiting for the interval
updateClock();

// Function to dynamically update the background based on the time of day
function updateBackground() {
  const now = new Date(); // Get the current date and time
  const hours = now.getHours(); // Extract the hour from the current time

  const body = document.body; // Reference the body element to change its background

  // Change the background color based on the time of day
  if (hours >= 6 && hours < 12) {
    // Morning: Light and refreshing gradient
    body.style.background = "linear-gradient(to right, #FFDEE9, #B5FFFC)";
  } else if (hours >= 12 && hours < 18) {
    // Afternoon: Warm and vibrant gradient
    body.style.background = "linear-gradient(to right, #FDC830, #F37335)";
  } else if (hours >= 18 && hours < 21) {
    // Evening: Cool and calm gradient
    body.style.background =
      "linear-gradient(to right, #0F2027, #203A43, #2C5364)";
  } else {
    // Night: Dark and soothing gradient
    body.style.background = "linear-gradient(to right, #141E30, #243B55)";
  }
}

// Call the updateBackground function every hour to refresh the background
setInterval(updateBackground, 3600000); // 3600000 ms = 1 hour

// Initialize the background immediately to match the current time of day
updateBackground();

// ---------------------STOPWATCH----------------------

// Variable to store the interval ID for the stopwatch
// Used to start and stop the timer functionality
let stopwatchInterval;

// Variable to store the current stopwatch time in seconds
let stopwatchTime = 0;

/**
 * Function to format the stopwatch time into HH:MM:SS format
 * @param {number} time - The total time in seconds
 * @returns {string} - The formatted time string in HH:MM:SS format
 */
function formatStopwatchTime(time) {
  const hours = Math.floor(time / 3600); // Calculate the number of hours
  const minutes = Math.floor((time % 3600) / 60); // Calculate the remaining minutes
  const seconds = time % 60; // Calculate the remaining seconds

  // Ensure all time units are two digits by padding with leading zeros
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

//   Event listener for the Start/Stop button
//   Toggles between starting and stopping the stopwatch

document.getElementById("start-stop").addEventListener("click", function () {
  if (stopwatchInterval) {
    // If the stopwatch is running, clear the interval to stop it
    clearInterval(stopwatchInterval);
    stopwatchInterval = null; // Set the interval ID to null to indicate it is stopped
    this.textContent = "Start"; // Update button text to indicate the start action
  } else {
    // If the stopwatch is not running, start the interval
    stopwatchInterval = setInterval(() => {
      stopwatchTime++; // Increment the stopwatch time by one second
      document.getElementById("stopwatch-time").textContent =
        formatStopwatchTime(stopwatchTime); // Update the displayed time in the stopwatch
    }, 1000); // Set the interval to execute every second
    this.textContent = "Stop"; // Update button text to indicate the stop action
  }
});

/**
 * Event listener for the Reset button
 * Resets the stopwatch to its initial state
 */
document.getElementById("reset").addEventListener("click", function () {
  clearInterval(stopwatchInterval); // Stop the stopwatch if it is running
  stopwatchInterval = null; // Set the interval ID to null
  stopwatchTime = 0; // Reset the stopwatch time to zero
  document.getElementById("stopwatch-time").textContent = "00:00:00"; // Reset the displayed time
  document.getElementById("start-stop").textContent = "Start"; // Reset the button text to "Start"
});

//------------------------------TODAY'S DATE -----------------------

// Function to update the date displayed on the webpage
function updateDate() {
  // Create a new Date object that represents the current date and time
  const now = new Date();

  // Define the formatting options for the date
  // - 'weekday': Displays the full name of the day (e.g., Monday, Tuesday)
  // - 'year': Displays the full year in numeric format (e.g., 2024)
  // - 'month': Displays the full name of the month (e.g., January, February)
  // - 'day': Displays the numeric day of the month (e.g., 1, 15, 31)
  const options = {
    weekday: "long", // Full name of the day
    year: "numeric", // Full numeric year
    month: "long", // Full name of the month
    day: "numeric", // Numeric day of the month
  };

  // Get the HTML element with the ID 'date'
  // Set its text content to the formatted date string
  // `toLocaleDateString` converts the date into a readable string based on the specified options
  // Passing 'undefined' as the first parameter uses the user's default locale
  document.getElementById("date").textContent = now.toLocaleDateString(undefined, options);
}

// Call the function to immediately update the date on the page when the script runs
updateDate();
