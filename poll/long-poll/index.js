const express = require("express");
const app = express();

const port = process.env.PORT || 8080;

// ? Using in-memory store for job statuses
const jobs = {};

app.use(express.json());

// * Route to submit a new job
app.post("/submit", (_req, res) => {
  try {
    // Generate a unique job ID based on the current timestamp
    const jobId = `Job:${Date.now()}`;

    // Initialize the job with 0% progress
    jobs[jobId] = 0;

    // Start updating the job progress
    updateJob(jobId, 0);

    // ? Respond with the job ID
    res.status(201).json({ jobId });
  } catch (error) {
    // Handle unexpected errors
    console.error("Error submitting job:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting the job" });
  }
});

// * Route to check the status of a job
// ? Long Polling
app.get("/check-status", async (req, res) => {
  try {
    const jobId = req.query.jobId;

    // Validate the job ID
    if (!jobId || !jobs.hasOwnProperty(jobId)) {
      return res.status(400).json({ error: "Invalid or missing job ID" });
    }

    console.log(`Checking status for JobId: ${jobId}`);

    // Continuously poll until the job is complete
    while (!(await checkJobComplete(jobId))) {
      // Keep polling until the job completes
    }

    // Once the job is complete, return the final status
    res
      .status(200)
      .json({ jobId, status: "Job completed", progress: jobs[jobId] });
  } catch (error) {
    // Handle unexpected errors
    console.error("Error checking job status:", error);
    res
      .status(500)
      .json({ error: "An error occurred while checking the job status" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to check if the job is complete (long polling mechanism)
const checkJobComplete = async (jobId) => {
  while (jobs[jobId] < 100) {
    // Wait for 1 second before checking the status again
    await delay(1000);
  }
  // Once the job is complete (>= 100%), exit the loop and return true
  return true;
};

// Function to simulate job progress updates
const updateJob = (jobId, progress) => {
  try {
    // Update the job progress in memory
    jobs[jobId] = progress;
    console.log(`Job ${jobId} - Progress: ${progress}%`);

    // If the job has completed, log the completion and stop the progress
    if (progress >= 100) {
      console.log(`Job ${jobId} completed.`);
      return;
    }

    // Continue updating the job progress every 5 seconds
    setTimeout(() => {
      updateJob(jobId, progress + 10);
    }, 5000);
  } catch (error) {
    // Handle unexpected errors during the job updates
    console.error(`Error updating job ${jobId}:`, error);
  }
};
