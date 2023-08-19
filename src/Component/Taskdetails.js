import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

  function Taskdetails(props) {
        const { className } = props;
        const [modal, setModal] = useState(false);
        const [task, setTask] = useState(props.task);
        const [temp, setTemp] = useState(1);
        useEffect(() => {
          toggle();
          setTask(props.task);
        }, [])

        const goPrevious = () => {
          window.history.go();
        };
        const toggle = () => {
          setModal(!modal);
          setTemp(!temp)
        }

  return (
    <div>
      <Button color="danger"  onClick={toggle}>
        View Task
      </Button>
      <Modal
        isOpen={modal}
        modalTransition={{ timeout: 700 }}
        backdropTransition={{ timeout: 1300 }}
        toggle={toggle}
        className={className}
      >
        <ModalHeader toggle={toggle}>Clarity Point Accounts</ModalHeader>
        <ModalBody>
          <div className="card mb-3" style={{ maxWidth: '540px' }}>
            <div className="row g-0">
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{task.title}</h5>
                  <p className="card-text">{task.desc} </p>
                  <p className="card-text"><small class="text-body-secondary">{task.status}</small></p>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <small class="text-body-secondary">{task.status} Task</small>
          <Button color="secondary" onClick={() => { toggle(); goPrevious() }}>
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

Taskdetails.propTypes = {
  className: PropTypes.string,
};

export default Taskdetails;