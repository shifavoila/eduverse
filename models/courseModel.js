const fetch = require('node-fetch');

const url = 'https://udemy-paid-courses-for-free-api.p.rapidapi.com/rapidapi/courses/search?page=1&page_size=10&query=python';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'ea86ec0756msh17e532df1e1c9c9p170c20jsnebad0933d91c',
        'x-rapidapi-host': 'udemy-paid-courses-for-free-api.p.rapidapi.com'
    }
};

const getCourses = async () => { 
    try {
        const response = await fetch(url, options);
        const courses = await response.json();
        return courses;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
};

module.exports = getCourses; 