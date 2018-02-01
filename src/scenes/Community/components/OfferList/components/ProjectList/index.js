import React from 'react';
import PropTypes from 'prop-types';
import ButtonOffering from '../../../../../../components/ButtonOffering';

function ProjectList(props) {
  return (
    <div>
      {props.projects.map(project => (
        <ButtonOffering
          key={project.id}
          name={project.name}
          to={`/projects/${project.id}`}
        />
      ))}
    </div>
  );
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object)
};

export default ProjectList;
