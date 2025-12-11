import { Container, Title, Text, Group, Button } from "@mantine/core";
import { Link, useParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";

import classes from "./DemoComponent.module.css";
import { useEffect } from "react";

function DemoComponent(){
  const { pageName } = useParams();
  
  useEffect(() => {
    if (pageName) {
      let capitalizedPageName;
      if (pageName === 'faqs') {
        capitalizedPageName = pageName.toUpperCase();
        document.title = `${capitalizedPageName} Demo | MSA`
      } else {
        capitalizedPageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
        document.title = `${capitalizedPageName} Demo | MSA`
      }
      }
    },[pageName])
  return (
    <div className={classes.root} >
      <Container size="md "className="select-none">
        {/* Error code/status */}
        <div className={classes.label}>DEMO</div>

        {/* Main title */}
        <Title className={`${classes.title} capitalize`} order={1}>
          Welcome to {pageName} Demo Component
        </Title>

        {/* Description with more content */}
        <Text size="lg" ta="center" className={classes.description} mt="md">
          This interactive demo shows what happens when you click footer links.
        </Text>


        {/* Action buttons */}
        <Group justify="center" mt={30}>
          <Button
            component={Link}
            to="/"
            variant="white"
            size="md"
            className={classes.homeButton}
            leftSection={<FaHome size={20} />}
          >
            Go to Home page
          </Button>

        </Group>
      </Container>
    </div>
  );
};

export default DemoComponent;
