import {
  Menu as MenuInner,
  MenuItem as MenuItemInner,
  SubMenu as SubMenuInner,
  MenuButton,
  MenuDivider,
} from '@szhsin/react-menu'
import rightArrow from './chevron-right-solid.svg'


const menuClassName = ({ state }:{state:any}) =>
  `box-border z-50 text-sm bg-white p-1.5 border rounded-md shadow-lg select-none focus:outline-none min-w-[9rem] ${
    state === 'opening' && 'animate-fadeIn'
  } ${state === 'closing' && 'animate-fadeOut'}`

const menuItemClassName = ({ hover, disabled, submenu }) =>
  

const Menu = (props) => <MenuInner {...props} menuClassName={`rounded-md px-3 py-1 focus:outline-none ${
    hover && 'text-white bg-blue-400'
  } ${disabled && 'text-gray-400'} ${submenu && 'flex items-center'}`} />

const MenuItem = (props) => (
  <MenuItemInner {...props} className={menuItemClassName} />
)

const SubMenu = (props) => (
  <SubMenuInner
    {...props}
    label={
      <>
        {props.label}
        <img className="ml-auto h-3" src={rightArrow} alt="right arrow" />
      </>
    }
    shift={-7}
    className="relative"
    menuClassName={menuClassName}
    itemProps={{ className: menuItemClassName }}
  />
)

export default function Page() {
  return (
    <Menu
      transition={true}
      menuButton={
        <MenuButton className="box-border border-2 border-gray-500 rounded px-2 m-3">
          Open menu
        </MenuButton>
      }
    >
      <MenuItem>New File</MenuItem>
      <MenuItem disabled>Save</MenuItem>
      <MenuItem>Print...</MenuItem>
      <MenuDivider className="h-px bg-gray-200 mx-2.5 my-1.5" />
      <SubMenu label="Edit">
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </SubMenu>
      <SubMenu label="Find">
        <MenuItem>Find...</MenuItem>
        <MenuItem>Replace...</MenuItem>
      </SubMenu>
    </Menu>
  )
}
