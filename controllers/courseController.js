const getCourses = require('../models/courseModel');

exports.renderCoursesPage = async (req, res) => {
    const userId = req.session.userId;

    try {
        const coursesData = await getCourses();
        const courses = coursesData.courses; // Extracting 'courses' array from the API response
        res.render('courses', { courses, user: { id: userId } });
    } catch (error) {
        console.error("Error loading courses:", error);
        res.status(500).send("Error loading courses");
    }
};