import { Col, Container, Row } from "react-bootstrap";

import InnoVault from "../Vaults/InnoVault/InnoVault";
import PerpetualVault from "../Vaults/PerpetualVault/PerpetualVault";
import StableEdgeVault from "../Vaults/StableEdgeVault/StableEdgeVault";
import EtherumVault from "../Vaults/EtherumVault/EtherumVault";

const OurVault = () => {
  return (
    <div className='our_vault'>
      <Container>
        <h2>Our Vaults</h2>
        <Row className='vault_row'>
          <Col xs={12} xl={6}>
            <InnoVault />
          </Col>
          <Col xs={12} xl={6}>
            <PerpetualVault />
          </Col>
          <Col xs={12} xl={6}>
            <StableEdgeVault />
          </Col>
          <Col xs={12} lg={6}>
            <EtherumVault />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OurVault;
