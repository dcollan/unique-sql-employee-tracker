INSERT INTO departments (department_name)
VALUES 
('Computer Software'),
('Marketing'),
('Finance'),
('Sales'),
('Research and Development'),
('Customer Service'),
('Information Technology'),
('Operations'),
('Legal'),
('Facilities Management');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Software Engineer', 90000.00, 1),
('Marketing Manager', 75000.00, 2),
('Financial Analyst', 80000.00, 3),
('Sales Associate', 60000.00, 4),
('Research Scientist', 95000.00, 5),
('Customer Service Rep', 45000.00, 6),
('Network Administrator', 70000.00, 7),
('Operations Manager ', 85000.00, 8),
('Legal Counsel', 100000.00, 9),
('Facilities Coordinator', 55000.00, 10);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Emily', 'Johnson', 1, 1),
('Michael', 'Smith', 2, 2),
('Sarah', 'Davis', 3, 3),
('Daniel', 'Brown', 4, 4),
('Jessica', 'Lee', 5, 5),
('Christopher', 'Wilson', 6, 6),
('Amanda', 'Jones', 7, 7),
('Matthew', 'Evans', 8, 8),
('Olivia', 'Taylor', 9, 9),
('William', 'Martinez', 10, 10);