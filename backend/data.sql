INSERT INTO Users(id, username, password) VALUES 
(21, 'admin', '$2b$10$A6fYfh85cL1W3iDCQQROXuW6Nj.OngV4ldJFQkLYr8QxAhIrrLprG'), 
(24, 'John Doe', '$2b$10$A6fYfh85cL1W3iDCQQROXuW6Nj.OngV4ldJFQkLYr8QxAhIrrLprG'),
(31, 'Cindy Lou', '$2b$10$A6fYfh85cL1W3iDCQQROXuW6Nj.OngV4ldJFQkLYr8QxAhIrrLprG');

INSERT INTO Quizzes(title, description, teacher_id) VALUES 
('Bio Quiz 1', 'This is the first quiz', 21),
('Phys Quiz 2', 'This is the second quiz', 21),
('Maths Quiz 3', 'This is the third quiz', 24),
('Bio Quiz 4', 'This is the fourth quiz', 24),
('Math Quiz 5', 'This is the fifth quiz', 21),
('Math Quiz 6', 'This is the sixth quiz', 31),
('Phys Quiz 7', 'This is the seventh quiz', 31),
('Phys Quiz 8', 'This is the eighth quiz', 21),
('English Quiz 9', 'This is the ninth quiz', 24),
('Hindi Quiz 10', 'This is the tenth quiz', 31);