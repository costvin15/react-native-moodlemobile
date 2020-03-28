import {callMoodleWebService} from '../../../api/helper';
import {Timeline} from '../../../blocks';

export const getBlock = block => {
  switch (block) {
    case 'timeline':
      return Timeline;
    default:
      return <></>;
  }
};

export const getDashboardBlocks = async () => {
  try {
    const data = await callMoodleWebService('core_block_get_dashboard_blocks');

    const blocks = [];
    data.blocks.map(block => blocks.push(getBlock(block.name)));

    // console.error(blocks);

    return blocks;
  } catch (error) {
    console.error(error);
  }
};

export default {getDashboardBlocks};
