import { Button, Container, Menu } from "semantic-ui-react";

interface Prop {
    handelFormOpen: () => void;
}

export default function NavBar({ handelFormOpen }: Prop) {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
                    My Social
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button onClick={()=>handelFormOpen()} positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    );
}