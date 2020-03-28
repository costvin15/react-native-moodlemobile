import {callMoodleWebService} from '../../../api/helper';
import {Timeline, NotFound} from '../../../blocks';

export const getBlock = block => {
  switch (block) {
    case 'timeline':
      return Timeline;
    default:
      return NotFound;
  }
};

export const getDashboardBlocks = async () => {
  try {
    const data = await callMoodleWebService('core_block_get_dashboard_blocks');

    const blocks = [];
    data.blocks.map(block => blocks.push(getBlock(block.name)));

    return blocks;
  } catch (error) {
    console.error(error);
  }
};

export default {getDashboardBlocks};
