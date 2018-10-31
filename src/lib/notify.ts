import { SwalOptions } from 'sweetalert/typings/modules/options';
const swal = require('sweetalert');

const config: Partial<SwalOptions> = {

};

export const notify = (msg: string) => {
  return swal('Create Files', msg, 'info', config);
};
