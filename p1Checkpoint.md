### ERD Spec
Entity Relatioship Diagram from dbeaver:

![alt text](https://github.com/200427-Revature-Training/milton_reyes_p1/blob/master/sql_tables/ERD.png "Entity Relatioship Diagram")

### API Specification
#### USERS && USER ROLES
+ get method to list users

   Required to verify and set login status

+ get method to match roles against users

   Required to set privileges to employees or finance managers and display proper allowed sections in the web site
### Reimbursement && Status && Type
+ get method to list reimbursement requests

   Users need to be able to see current and past requests && request status

+ post method to save a new reimbursement request and type

   Users need to create a new reimbursement request

+ post method to update reimbursement && reimbursement status

   Finance managers need to be able to update reimbursement status & assign the new status to the reimbursement request