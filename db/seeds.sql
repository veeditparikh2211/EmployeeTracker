INSERT into department (name) VALUES ("Marketing"), ("IT"), ("Sales"), ("Designing");

INSERT into role (title, salary, department_id)
VALUES ("web Developer", "80000", 2),("Tester", "90000", 2),("PhotoshopEditor", "70000", 4),
        ("Designer", "65000", 4),("Accountant", "100000", 3),("Payroll", "120000", 3),
        ("Marketing agent", "55000", 1),("Business Executive", "150000", 1);

INSERT into employee(first_name,last_name,role_id,manager_id)
VALUES ("Veedit","Parikh","1",NULL),
("Vishal","Patel","2",1),
("Prem","Lokhandwala","4",NULL),
("Saurav","Patel","4",2),
("Harshil","Patel","3",NULL),
("Dweep","Agarwal","5",6),
("Happy","Kaur","7",NULL),
("Sakhshi","Maahjan","8",7);