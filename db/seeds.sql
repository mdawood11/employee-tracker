INSERT INTO department (name)
VALUES 
("Procurement"),
("Admin"),
("IT"),
("Finance"),
("HR");

-- roles
INSERT INTO role (title, salary, department_id)
VALUES 

("Procurement Manager", 80000, 1),
("Procurement Officer", 60000, 1),
("Admin Manager", 90000, 2),
("Admin Assistant", 50000, 2),
("General IT Manager", 85000, 3),
("General IT Assistant", 65000, 3),
("Finance Manager", 87000, 4),
("Finance Officer", 67000, 4),
("HR Manager", 88000, 5),
("HR Genrelist", 78000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 

("Dawood", "Noori", 1, NULL),
("Naqib", "Stanekzai", 2, 1),
("Masih", "Omer", 3, NULL),
("Lita", "Tanha", 4, 1),
("Shahab", "Ali", 5, NULL),
("Khaiber", "Safi", 6, 1),
("Anosh", "Nezam", 7, NULL),
("Yama", "Fazli", 8, 1),
("John", "Geudry", 9, NULL),
("Mike", "Young", 10, 1);










