Entire Team:

Write a set of user stories and create issues needed to implement these stories in your GitHub repository. Utilize the guides in Dr. Dobra's announcement. Decide on a set of issues to complete for this sprint for both frontend and backend teams. Complete issues and push code to your GitHub repository

Team Videos:

Front End: Record a video demoing your frontend work. Use a mocked up backend if necessary.

Backend: Record a video demoing your backend work. Use the command line or Postman.

---

User Stories (Progress Made):

As a teacher (or assistant), I want to sign in only once and be able to manage all my courses because signing in for a course each time is annoying. UI finished

As a student, I only wanna have a course id, and not a password when I sign in because my brain is unable to carry any more information than necessary. UI finished

User Stories (TODO):

As any user of the TA bot site, I want the site to be well-organized and have an easily accessible structure as this application is meant to be a quick and easy alternative to scouring the syllabus or other sections of the course.

As a student, I want any question the TA bot can't answer to be noted for the professor to add input to so students with the same question in the future have an answer.

As a professor, I want to be able to quickly add my own answers to questions that are not included in the basic questions when first setting up the TA-Bot.

As a student I want to ask specific questions about my class so that I don't have to parse the syllabus.

As a professor I want to reply to common questions only once, so that I can have more time for my other duties.

---

What issues your team planned to address:

Front end: Team plans on implementing a TA Bot (chat bot), however, research into Diagoflow is necessary to see if it will work with a database.  
The team needs to address how to edit an Angular Material grid list, or each card individually.
We planned to finish the login page to sign-in. We hoped to have the ability to sign in as a student using only a course id, and with a username/password as a teacher.
We also hoped to get some simple navigation going (e.g. sign-in -> dashboard).

Backend:
Our goal was to write golang code to make a connection from golang to mysql.
We planned to write a mysql database that reflects the information from the interactions between the users and bot.
Another goal, specifically for the log-in, was connecting the backend to the frontend.
Our final goal was to begin simple queries to a database that would reflect what our users would be adding.

---

Which ones were successfully completed

Frontend:

The team has implemented a login page with the ability to sign in either as a student or teacher. Still needs interaction with the database for authentication and data-retrieval.

A sample (placeholding) Diagoflow chat bot was included on the dashboard.  It is able to answer 2 simple questions.

Backend:
As a team, we were able to make a successful connection from golang to mysql. We were also able to construct a mysql database that reflects the information from the interactions between the users and bot. Furthermore, we were able to use Postman to set up a compilation of basic commands (Create, GetAll, etc) to a mocked up database for users, including ClassID, Name, and Description fields. We hope to extend this to reflect how our users will interact with entering information from the frontend in future sprints. Finally, we were able to further develop our understanding of Golang, and key Golang libraries such as GORM for database interaction, Gorilla Mux for http routing, and my-sql-driver. We also began using and understanding Golang's internal packages for json encoding and http handling.

---

Which ones didn't and why?

Carlo Quick - I was unable to manipulate individual cards in the Angular Material’s Schematic: Dashboard.  Any edits to one were in turn changing all of the cards.  For now, there are two cards: one syllabus placeholder and another “holding card“ for the test chat bot.

Abbas Shah - I was unable to get the sign-in page to communicate with go/mySQL because it is a bit challenging for me to understand at the moment. Further YouTube tutorials will be watched.

Nick Rodriguez - I was unable to properly connect the frontend to the backend for the log-in due to time constraints and a high learning curve in this sprint. 

Riley Willis - Likewise with Nick, I was unable to figure out in time how to connect the angular application of the frontend to the golang program communicating with the mySQL database. Furthermore, although we are pretty sure we understand the structure of the database we will need, we have not completely solidified a particular organization, which will likely be figured out by Sprint 2.
