import React, { useState, useEffect } from "react";
import CourseStore from "../stores/CourseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses, deleteCourse } from "../actions/courseActions";

function CoursesPage(props) {
  const [courses, setCourses] = useState(CourseStore.getCourses());

  useEffect(() => {
    CourseStore.addChangeListener(onChange);
    const slug = props.match.params.slug; //pulled from the path '/courses/:slug'
    if (CourseStore.getCourses().length === 0) {
      loadCourses();
    } else if (slug) {
      deleteCourse(slug);
      props.history.push("/courses");
    }
    return () => CourseStore.removeChangeListener(onChange); //cleanup on unmount
  }, [props.match.params.slug, courses.length, props.history]);

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
