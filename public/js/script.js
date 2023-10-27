document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#post-form");
  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const title = form.querySelector("#title").value;
      const content = form.querySelector("#content").value;

      try {
        const response = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content }),
        });

        if (response.ok) {
        } else {
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
});
