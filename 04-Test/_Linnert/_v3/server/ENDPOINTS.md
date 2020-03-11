# **Endpoints**

***1. Register*** /register
* <span style="color:red">POST</span> /

***2. Login*** /login
* <span style="color:red">POST</span> /

***3. Logout*** /logout
* <span style="color:red">POST</span> /

***4. Register*** /register
* <span style="color:red">POST</span> /

***5. Userdetails*** /userdetails
* <span style="color:green">GET</span> /
* <span style="color:red">POST</span> /update

***6. Tableview*** /tableview
* <span style="color:green">GET</span> /
* <span style="color:red"> POST</span> /update

***7. Calendarevents*** /calendarevents
* <span style="color:green">GET</span> /
* <span style="color:red">POST</span> /add
* <span style="color:red">POST</span> /*calendareventID*/update
* <span style="color:red">POST</span> /<span style="color:grey">*calendareventID*</span>/delete

***8. Projects*** /projects
* <span style="color:green">GET</span> /
* <span style="color:green">GET</span> /<span style="color:grey">*projectID*</span>
* <span style="color:red">POST</span> /add
* <span style="color:red">POST</span> /<span style="color:grey">*projectID*</span>/update
* <span style="color:red">POST</span> /<span style="color:grey">*projectID*</span>/delete

***9. Documents*** /projects/<span style="color:grey">*projectID*</span>/documents
* <span style="color:green">GET</span> /
* <span style="color:green">GET</span> /<span style="color:grey">*documentID*</span>
* <span style="color:red">POST</span> /add
* <span style="color:red">POST</span> /<span style="color:grey">*documentID*</span>/update
* <span style="color:red">POST</span> /<span style="color:grey">*documentID*</span>/delete

***10. Contacts*** /projects/<span style="color:grey">*projectID*</span>/contacts
* <span style="color:green">GET</span> /
* <span style="color:green">GET</span> /<span style="color:grey">*contactID*</span>
* <span style="color:red">POST</span> /add
* <span style="color:red">POST</span> /<span style="color:grey">*contactID*</span>/update
* <span style="color:red">POST</span> /<span style="color:grey">*contactID*</span>/delete

***11. Locations*** /projects/<span style="color:grey">*projectID*</span>/locations
* <span style="color:green">GET</span> /
* <span style="color:green">GET</span> /<span style="color:grey">*locationID*</span>
* <span style="color:red">POST</span> /add
* <span style="color:red">POST</span> /<span style="color:grey">*locationID*</span>/update
* <span style="color:red">POST</span> /<span style="color:grey">*locationID*</span>/delete

***12. Shotlists*** /projects/<span style="color:grey">*projectID*</span>/shotlists
* <span style="color:green">GET</span> /
* <span style="color:green">GET</span> /<span style="color:grey">*shotlistID*</span>
* <span style="color:red">POST</span> /add
* <span style="color:red">POST</span> /<span style="color:grey">*shotlistID*</span>/update
* <span style="color:red">POST</span> /<span style="color:grey">*shotlistID*</span>/delete

***13. Shots*** /projects/<span style="color:grey">*projectID*</span>/shotlists/<span style="color:grey">*shotlistID*</span>/shots
* <span style="color:green">GET</span> /
* <span style="color:green">GET</span> /<span style="color:grey">*shotsID*</span>
* <span style="color:red">POST</span> /add
* <span style="color:red">POST</span> /<span style="color:grey">*shotsID*</span>/update
* <span style="color:red">POST</span> /<span style="color:grey">*shotsID*</span>/delete