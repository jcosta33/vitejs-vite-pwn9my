export interface IOffcanvas {
  isActive: boolean;
  isLarge?: boolean;
  onClose?: () => void;
  close?: () => void;
}

export const colors = {
  black: '#04050A',
  black_bis: '#0B1033',
  black_ter: '#05263B',
  grey_darker: '#3E5460',
  grey_dark: '#8E99A7',
  grey: '#8E99A7',
  grey_light: '#ADA9BB',
  grey_lighter: '#CAD0D9',
  grey_lightest: '#E5E8ED',
  white_ter: '#F5F7FA',
  white_bis: '#F8FAFB',
  white: 'hsl(0, 0%, 100%)',
  orange: '#FF7A5C',
  yellow: '#FBBB24',
  yellow_lighter: '#FFE400',
  green: '#00C092',
  turquoise: '#60FBD5',
  aqua: '#00AFB9',
  blue: '#28A6DD',
  blue_dark: '#0975C7',
  blue_darker: '#002F83',
  blue_darkest: '#030E5E',
  purple: '#7854F7',
  red: '#F4253B',
  magenta: '#CC088A',
  fuchsia: '#FF3781',
  navi: '#003A6B',
  midnight: '#0C6980',
  beetle: '#AFCCCF',
  serenity: '#C4DBE0',
  plum: '#938BB7',
  clot: '#970C10',
  crimson: '#710117',
  coral: '#CF6856',
  mimosa: '#FFD780',
  beige: '#E8D5B5',
  aqualight: '#E2F1F2',
  ivory: '#EDF1E9',
  cream: '#FFFADE',
  alice: '#FBF7FF',
  quartz: '#F6E2E3',
  soft: '#F5F7FE',
};

export interface ISidebar {
  title?: string;
  isActive?: boolean;
  items: ISidebarItem[];
}

export interface ISidebarItem {
  route?: string;
  label: string;
  icon?: string;
  hidden?: boolean;
  action?: () => void;
  order?: number;
  url?: string;
  children?: Array<ISidebarItem>;
}

export interface IModal {
  isActive: boolean;
  isLarge?: boolean;
  isCard?: boolean;
  onClose?: () => void;
  close?: (param?: number) => void;
}

export interface IPopup {
  type?: string;
  message?: string;
  position?: string;
  onClose?: () => void;
  autohide?: boolean;
}

export interface IDropdown {
  position?: string;
  isActive?: boolean;
  isHover?: boolean;
  onClose?: () => void;
  close?: () => void;
}

export interface IDragEvent {
  moved: IDraggableMoved;
}

export interface IDraggableMoved {
  element: Element;
  oldIndex: number;
  newIndex: number;
}
export interface Element {
  id: number;
  event: number;
  order: number;
  active: boolean;
  field_type: string;
  title: string;
  show_title: boolean;
  mandatory: boolean;
  options: string;
  validation: string;
  message: string;
  dependence_field?: number | null;
  dependence_operator: string;
  dependence_value: string;
  cost: string;
  apply_costs: boolean;
  filter_options: boolean;
  filter_limits?: null;
  dependence_cost_field?: null;
  dependence_cost_operator: string;
  dependence_cost_value: string;
  dependence_cost_cost?: null;
  unique: boolean;
  hide_on_media_channel_message: boolean;
  show_horizontal: boolean;
}

export const modal = {
  isActive: false,
};
