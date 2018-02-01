import React from 'react';
import { Typography } from 'material-ui';

import DisplayMap from './components/DisplayMap';
import ProjectDetails from './components/ProjectDetails';
import ButtonJoin from './components/ButtonJoin';
import ParticipantList from './components/ParticipantList';

const ProjectDetail = props => {
  return (
    <div>
      <Typography type="display2">{props.project.name}</Typography>
      <Typography type="subheading">{props.project.location}</Typography>
      <div>
        <DisplayMap location={props.project.coordinates} />
        {/* TODO the hourly award needs to be calculated */}
        <ProjectDetails
          startTime={props.project.start}
          duration={props.project.duration}
          hourlyAward={15}
        />
      </div>
      <ButtonJoin />
      <ParticipantList
        participants={props.project.participants}
        users={props.users}
      />
    </div>
  );
};

export default ProjectDetail;
