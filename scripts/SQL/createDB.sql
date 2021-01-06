DROP TABLE IF EXISTS Teacher CASCADE;
CREATE TABLE Teacher (
    ID SERIAL PRIMARY KEY,
    FirstName varchar(255) NOT NULL,
    LastName varchar(255) NOT NULL,
    Login varchar(255) UNIQUE NOT NULL,
    Password varchar(255) NOT NULL,
    IdClass INT REFERENCES Class(ID)
);

DROP TABLE IF EXISTS SchoolSubjectCategory CASCADE;
CREATE TABLE SchoolSubjectCategory(
    ID SERIAL PRIMARY KEY,
    Name Varchar(255) NOT NULL
);

DROP TABLE IF EXISTS SchoolSubjectSubCategory CASCADE;
CREATE TABLE SchoolSubjectSubCategory(
    ID SERIAL PRIMARY KEY,
    Name Varchar(255) NOT NULL,
    IdSchoolSubjectCategory INT REFERENCES SchoolSubjectCategory(ID)
);


DROP TABLE IF EXISTS Class CASCADE;
CREATE TABLE Class (
    ID SERIAL PRIMARY KEY,
    Year int NOT NULL,
    Letter varchar(255) NOT NULL,
    UNIQUE (Year,Letter)
);


DROP TABLE IF EXISTS Event CASCADE;
CREATE TABLE Event(
    ID SERIAL PRIMARY KEY,
    Name varchar(255) NOT NULL,
    Date DATE NOT NULL,
    Description varchar(255),
    IdClass INT REFERENCES Class(ID)
);

DROP TABLE IF EXISTS Pupil CASCADE;
CREATE TABLE Pupil(
    ID SERIAL PRIMARY KEY,
    Login varchar(255) UNIQUE NOT NULL,
    Password varchar(255) NOT NULL,
    FirstName varchar(255) NOT NULL,
    LastName varchar(255) NOT NULL,
    Birthdate DATE NOT NULL,
    IdClass INT REFERENCES Class(ID) NOT NULL
);


DROP TABLE IF EXISTS Tutor CASCADE;
CREATE TABLE Tutor(
    ID SERIAL PRIMARY KEY,
    Login varchar(255) UNIQUE NOT NULL,
    Password varchar(255) NOT NULL,
    FirstName varchar(255) NOT NULL,
    LastName varchar(255) NOT NULL,
    PhoneNumber varchar(255)
);


DROP TABLE IF EXISTS Responsible CASCADE;
CREATE TABLE Responsible(
    ID SERIAL PRIMARY KEY,
    IdTutor INT REFERENCES Tutor(ID) NOT NULL,
    IdPupil INT REFERENCES Pupil(ID) NOT NULL,
    UNIQUE(IdTutor,IdPupil)
);

DROP TABLE IF EXISTS Task CASCADE;
CREATE TABLE Task(
    ID SERIAL PRIMARY KEY,
    Title Varchar(255) NOT NULL,
    Type Varchar(255),
    Date DATE NOT NULL,
    IdSchoolSubjectSubCategory INT REFERENCES SchoolSubjectSubCategory(ID) NOT NULL,
    IdClass INT REFERENCES Class(ID) NOT NULL
);

DROP TABLE IF EXISTS Test CASCADE;
CREATE TABLE Test(
    ID SERIAL PRIMARY KEY,
    Title Varchar(255) NOT NULL,
    MaxValue INT NOT NULL,
    Date DATE NOT NULL,
    IdSchoolSubjectSubCategory INT REFERENCES SchoolSubjectSubCategory(ID) NOT NULL,
    IdClass INT REFERENCES Class(ID) NOT NULL
);

DROP TABLE IF EXISTS TestResult CASCADE;
CREATE TABLE TestResult(
    ID SERIAL PRIMARY KEY,
    Result INT,
    note Varchar(255),
    IdTest INT REFERENCES Test(ID),
    SignedBy INT REFERENCES Tutor(ID),
    IdPupil INT REFERENCES Pupil(ID)
);






INSERT INTO Teacher (FirstName,LastName,Login,Password,IdClass)
VALUES
('Antoine','Lambert','ant.lamb.al@gmail.com','$2b$10$yzm9ReqMyLPZ4zBbuTUoPeeDRnCe1zCcM/OMGgOOv0P7.vSSMdDqq',1),
('Antoine','Dumont','antoine@gmail.com','$2b$10$yzm9ReqMyLPZ4zBbuTUoPeeDRnCe1zCcM/OMGgOOv0P7.vSSMdDqq',2),
('Thomas','Martin','thomasMartin@gmail.com','$2b$10$yzm9ReqMyLPZ4zBbuTUoPeeDRnCe1zCcM/OMGgOOv0P7.vSSMdDqq',1),
('Jean','doe','jeandoe@gmail.com','$2b$10$yzm9ReqMyLPZ4zBbuTUoPeeDRnCe1zCcM/OMGgOOv0P7.vSSMdDqq',1);

INSERT INTO SchoolSubjectCategory(Name)
VALUES
('Français'),
('Mathémathiques'),
('Eveil'),
('autres');

INSERT INTO SchoolSubjectSubCategory(Name, IdSchoolSubjectCategory)
VALUES
('Grammaire',1),
('Congugaison',1),
('Géométrie',2),
('Géographie',3),
('Dessin',4);

INSERT INTO Class (Year,Letter)
VALUES
(1,'A'),
(1,'B'),
(2,'C');

INSERT INTO Event(Name, Date, Description, IdClass)
VALUES
('Piscine',current_date - '1 day':: interval,'Prendre Maillot De Bain',1),
('Fin Du Monde V2',current_date,'et bonne année',1),
('Gym',current_date,'Course à pied',1),
('Covid-20',current_date + '1 day':: interval,'par ce que 20>19 haha ',1),
('Piscine',current_date + '1 week':: interval,'ne pas oublier son maillot',1),
('Gym',current_date + '2 week':: interval,'Sport en salle',1);

INSERT INTO Pupil(Login, Password, FirstName, LastName, Birthdate, IdClass)
VALUES
('AntoineLambert','$2b$10$Wkx2BKSmDJ2gj.mQiivWCOy7B5FxWotyvrX1D4uX4Ma2MpSaRn.TK','Antoine','Lambert','16-09-1997',1),
('AntoineDumont','$2b$10$Wkx2BKSmDJ2gj.mQiivWCOy7B5FxWotyvrX1D4uX4Ma2MpSaRn.TK','Antoine','Dumont','02-04-1995',1);

INSERT INTO Tutor(Login, Password, FirstName, LastName, PhoneNumber)
VALUES
('ant@gmail.com','$2b$10$/MygEjq.dsqro5popilfb.RJNn52v0X9jV0R6m2lgWugh/yrDRn.i','Antoine','Lambert','0032498194975');

INSERT INTO Responsible(IdPupil,IdTutor)
VALUES
(1,1);

INSERT INTO Task(Title, Date, IdSchoolSubjectSubCategory, IdClass)
VALUES
('préparer le nouvel an','2020-12-30',2,1),
('veille du nouvel an','2020-12-31',2,1),
('nouvel an','2021-01-01',2,1),
('deux janvier','2021-01-02',3,1),
('je n ai plus d idee de noms','2021-01-03',2,1),
('du coup','2021-01-04',2,1),
('bip','2021-01-05',2,1),
('bop','2021-01-06',3,1),
('bip','2021-01-07',2,1),
('bop','2021-01-08',3,1),
('bip','2021-01-09',2,1),
('bop','2021-01-10',3,1),
('bip','2021-01-11',2,1),
('bop','2021-01-12',3,1);

INSERT INTO Test(Title, MaxValue,Date, IdSchoolSubjectSubCategory, IdClass)
VALUES
('Verbes en -ER',20,'2021-01-06',2,1),
('Pluriel des noms',10,'2021-01-07',1,1),
('Les carrés',20,'2021-01-08',3,1),
('Les capitales d Europe',10,'2021-01-09',4,1),
('Aquarelle',5,'2021-01-10',5,1);

INSERT INTO TestResult(Result, note, IdTest, IdPupil)
VALUES
(1,'Catastrophique, à revoir',1,1),
(20,'Félicitation',1,2),
(5,'Bof bof peux mieux faire',2,1),
(10,'Encore un score parfait',2,2);

