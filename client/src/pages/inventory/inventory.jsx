import React from 'react';
import { Select, Divider, Input, Button} from 'antd';

const { Option } = Select;

let index = 0;

class Inventory extends React.Component {
    state = {
        items: ['jack', 'lucy'],
        name: '',
    };
    
    onNameChange = event => {
        this.setState({
            name: event.target.value,
        });
    };
    
    addItem = () => {
        console.log('addItem');
        const { items, name } = this.state;
        this.setState({
            items: [...items, name || `New item ${index++}`],
            name: '',
        });
    };
    
    render() {
        const { items, name } = this.state;
        return (
            <Select
                style={{ width: 240 }}
                placeholder="custom dropdown render"
                dropdownRender={menu => (
                    <div>
                        {menu}
                        <Divider style={{ margin: '4px 0' }} />
                        <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                            <Input style={{ flex: 'auto' }} value={name} onChange={this.onNameChange} />
                            <Button
                                style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                                onClick={this.addItem}
                            >Add item
                            </Button>
                        </div>
                    </div>
                )}
            >
                {items.map(item => (
                    <Option key={item}>{item}</Option>
                ))}
            </Select>
        );
    }
}

export default Inventory;







