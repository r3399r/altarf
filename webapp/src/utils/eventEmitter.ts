import mitt from 'mitt';

const emitter = mitt();

emitter.emit('sessionExpired');

export default emitter;
