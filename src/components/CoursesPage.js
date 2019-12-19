import React, { useState, useEffect } from "react";
import CourseStore from "../stores/CourseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses } from "../actions/courseActions";

function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    CourseStore.addChangeListener(onChange);
    if (CourseStore.getCourses().length === 0) loadCourses();

    return () => CourseStore.removeChangeListener(onChange); //cleanup on unmount
  }, []); //run once

  function onChange() {
    setCourses(CourseStore.getCourses());
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      <CourseList courses={courses} />
    </>
  );
}

export default CoursesPage;
