import {callMoodleWebService} from '../../../api/helper';
import {NotFound, Timeline, RecentlyAccessedCourses} from '../../../blocks';

export const getBlock = block => {
  switch (block) {
    case 'timeline':
      return Timeline;
    case 'recentlyaccessedcourses':
      return RecentlyAccessedCourses;
    default:
      return NotFound;
  }
};

export const getDashboardBlocks = async () => {
  try {
    const blocks = [];
    const data = await callMoodleWebService('core_block_get_dashboard_blocks');
    data.blocks.map(block =>
      blocks.push({
        Block: getBlock(block.name),
        title: block.name,
      }),
    );
    return blocks;
  } catch (error) {
    console.error(error);
  }
};

export default {getDashboardBlocks};
