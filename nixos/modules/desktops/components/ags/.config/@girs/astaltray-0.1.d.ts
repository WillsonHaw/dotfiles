/// <reference path="./glib-2.0.d.ts" />
/// <reference path="./gio-2.0.d.ts" />
/// <reference path="./gobject-2.0.d.ts" />
/// <reference path="./gmodule-2.0.d.ts" />
/// <reference path="./gdkpixbuf-2.0.d.ts" />

/**
 * Type Definitions for Gjs (https://gjs.guide/)
 *
 * These type definitions are automatically generated, do not edit them by hand.
 * If you found a bug fix it in `ts-for-gir` or create a bug report on https://github.com/gjsify/ts-for-gir
 *
 * The based EJS template file is used for the generated .d.ts file of each GIR module like Gtk-4.0, GObject-2.0, ...
 */

declare module 'gi://AstalTray?version=0.1' {

// Module dependencies
import type GLib from 'gi://GLib?version=2.0';
import type Gio from 'gi://Gio?version=2.0';
import type GObject from 'gi://GObject?version=2.0';
import type GModule from 'gi://GModule?version=2.0';
import type GdkPixbuf from 'gi://GdkPixbuf?version=2.0';

export namespace AstalTray {

    /**
     * AstalTray-0.1
     */


    /**
     * @gir-type Enum
     */
    export namespace Category {
        export const $gtype: GObject.GType<Category>;
    }

    /**
     * @gir-type Enum
     */
    enum Category {
        APPLICATION,
        COMMUNICATIONS,
        SYSTEM,
        HARDWARE,
    }


    /**
     * @gir-type Enum
     */
    export namespace Status {
        export const $gtype: GObject.GType<Status>;
    }

    /**
     * @gir-type Enum
     */
    enum Status {
        PASSIVE,
        ACTIVE,
        NEEDS_ATTENTION,
    }


    const MAJOR_VERSION: number;

    const MINOR_VERSION: number;

    const MICRO_VERSION: number;

    const VERSION: string;

    function category_to_nick(): string;

    /**
     * @param value 
     */
    function category_from_string(value: string): Category;

    function status_to_nick(): string;

    /**
     * @param value 
     */
    function status_from_string(value: string): Status;

    /**
     * Get the singleton instance of {@link AstalTray.Tray}
     */
    function get_default(): Tray;

    namespace TrayItem {
        // Signal signatures
        interface SignalSignatures extends GObject.Object.SignalSignatures {
            /**
             * @signal
             */
            changed: () => void;
            /**
             * @signal
             */
            ready: () => void;
            "notify::title": (pspec: GObject.ParamSpec) => void;
            "notify::category": (pspec: GObject.ParamSpec) => void;
            "notify::status": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-markup": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-text": (pspec: GObject.ParamSpec) => void;
            "notify::id": (pspec: GObject.ParamSpec) => void;
            "notify::is-menu": (pspec: GObject.ParamSpec) => void;
            "notify::icon-theme-path": (pspec: GObject.ParamSpec) => void;
            "notify::icon-name": (pspec: GObject.ParamSpec) => void;
            "notify::icon-pixbuf": (pspec: GObject.ParamSpec) => void;
            "notify::gicon": (pspec: GObject.ParamSpec) => void;
            "notify::item-id": (pspec: GObject.ParamSpec) => void;
            "notify::menu-path": (pspec: GObject.ParamSpec) => void;
            "notify::menu-model": (pspec: GObject.ParamSpec) => void;
            "notify::action-group": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends GObject.Object.ConstructorProps {
            title: string;
            category: Category;
            status: Status;
            tooltip: Tooltip | null;
            tooltip_markup: string;
            tooltipMarkup: string;
            tooltip_text: string;
            tooltipText: string;
            id: string;
            is_menu: boolean;
            isMenu: boolean;
            icon_theme_path: string;
            iconThemePath: string;
            icon_name: string;
            iconName: string;
            icon_pixbuf: GdkPixbuf.Pixbuf;
            iconPixbuf: GdkPixbuf.Pixbuf;
            gicon: Gio.Icon;
            item_id: string;
            itemId: string;
            menu_path: never;
            menuPath: never;
            menu_model: Gio.MenuModel | null;
            menuModel: Gio.MenuModel;
            action_group: Gio.ActionGroup | null;
            actionGroup: Gio.ActionGroup;
        }
    }

    /**
     * @gir-type Class
     */
    class TrayItem extends GObject.Object {
        static $gtype: GObject.GType<TrayItem>;

        // Properties
        /**
         * The Title of the TrayItem
         */
        get title(): string;
        set title(val: string);

        /**
         * The category this item belongs to
         */
        get category(): Category;
        set category(val: Category);

        /**
         * The current status of this item
         */
        get status(): Status;
        set status(val: Status);

        /**
         * The tooltip of this item
         */
        get tooltip(): Tooltip | null;
        set tooltip(val: Tooltip | null);

        /**
         * A markup representation of the tooltip. This is basically equvivalent to `tooltip.title \n tooltip.description`
         * @read-only
         */
        get tooltip_markup(): string;

        /**
         * A markup representation of the tooltip. This is basically equvivalent to `tooltip.title \n tooltip.description`
         * @read-only
         */
        get tooltipMarkup(): string;

        /**
         * A text representation of the tooltip. This is basically equvivalent to `tooltip.title \n tooltip.description.`
         * @read-only
         */
        get tooltip_text(): string;

        /**
         * A text representation of the tooltip. This is basically equvivalent to `tooltip.title \n tooltip.description.`
         * @read-only
         */
        get tooltipText(): string;

        /**
         * the id of the item. This id is specified by the tray app.
         */
        get id(): string;
        set id(val: string);

        /**
         * If set, this only supports the menu, so showing the menu should be prefered over calling {@link AstalTray.TrayItem.activate}.
         */
        get is_menu(): boolean;
        set is_menu(val: boolean);

        /**
         * If set, this only supports the menu, so showing the menu should be prefered over calling {@link AstalTray.TrayItem.activate}.
         */
        get isMenu(): boolean;
        set isMenu(val: boolean);

        /**
         * The icon theme path, where to look for the {@link AstalTray.TrayItem.icon_name}. It is recommended to use the [property@
         * AstalTray.TrayItem:gicon] property, which does the icon lookups for you.
         */
        get icon_theme_path(): string;
        set icon_theme_path(val: string);

        /**
         * The icon theme path, where to look for the {@link AstalTray.TrayItem.icon_name}. It is recommended to use the [property@
         * AstalTray.TrayItem:gicon] property, which does the icon lookups for you.
         */
        get iconThemePath(): string;
        set iconThemePath(val: string);

        /**
         * The name of the icon. This should be looked up in the {@link AstalTray.TrayItem.icon_theme_path} if set or in the currently used icon 
         * theme otherwise. It is recommended to use the {@link AstalTray.TrayItem.gicon} property, which does the icon lookups for you.
         * @read-only
         */
        get icon_name(): string;

        /**
         * The name of the icon. This should be looked up in the {@link AstalTray.TrayItem.icon_theme_path} if set or in the currently used icon 
         * theme otherwise. It is recommended to use the {@link AstalTray.TrayItem.gicon} property, which does the icon lookups for you.
         * @read-only
         */
        get iconName(): string;

        /**
         * A pixbuf containing the icon. It is recommended to use the {@link AstalTray.TrayItem.gicon} property, which does the icon lookups for 
         * you.
         * @read-only
         */
        get icon_pixbuf(): GdkPixbuf.Pixbuf;

        /**
         * A pixbuf containing the icon. It is recommended to use the {@link AstalTray.TrayItem.gicon} property, which does the icon lookups for 
         * you.
         * @read-only
         */
        get iconPixbuf(): GdkPixbuf.Pixbuf;

        /**
         * Contains the items icon. This property is intended to be used with the gicon property of the Icon widget and the recommended way to display the 
         * icon. This property unifies the {@link AstalTray.TrayItem.icon_name}, {@link AstalTray.TrayItem.icon_theme_path} and [property
         * `AstalTray`.TrayItem:icon-pixbuf] properties.
         */
        get gicon(): Gio.Icon;
        set gicon(val: Gio.Icon);

        /**
         * The id of the item used to uniquely identify the TrayItems by this lib.
         */
        get item_id(): string;
        set item_id(val: string);

        /**
         * The id of the item used to uniquely identify the TrayItems by this lib.
         */
        get itemId(): string;
        set itemId(val: string);

        /**
         * The object path to the dbusmenu
         */
        get menu_path(): never;
        set menu_path(val: never);

        /**
         * The object path to the dbusmenu
         */
        get menuPath(): never;
        set menuPath(val: never);

        /**
         * The MenuModel describing the menu for this TrayItem to be used with a MenuButton or PopoverMenu. The actions for this menu are defined in 
         * {@link AstalTray.TrayItem.action_group}.
         * @read-only
         */
        get menu_model(): Gio.MenuModel | null;

        /**
         * The MenuModel describing the menu for this TrayItem to be used with a MenuButton or PopoverMenu. The actions for this menu are defined in 
         * {@link AstalTray.TrayItem.action_group}.
         * @read-only
         */
        get menuModel(): Gio.MenuModel;

        /**
         * The ActionGroup containing the actions for the menu. All actions have the `dbusmenu` prefix and are setup to work with the [property@
         * AstalTray.TrayItem:menu-model]. Make sure to insert this action group into a parent widget of the menu, eg the MenuButton for which the MenuModel for 
         * this TrayItem is set.
         * @read-only
         */
        get action_group(): Gio.ActionGroup | null;

        /**
         * The ActionGroup containing the actions for the menu. All actions have the `dbusmenu` prefix and are setup to work with the [property@
         * AstalTray.TrayItem:menu-model]. Make sure to insert this action group into a parent widget of the menu, eg the MenuButton for which the MenuModel for 
         * this TrayItem is set.
         * @read-only
         */
        get actionGroup(): Gio.ActionGroup;

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: TrayItem.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<TrayItem.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        // Signals
        /** @signal */
        connect<K extends keyof TrayItem.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, TrayItem.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof TrayItem.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, TrayItem.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof TrayItem.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<TrayItem.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        /**
         * tells the tray app that its menu is about to be opened, so it can update the menu if needed. You should call this method before openening the 
         * menu.
         */
        about_to_show(): void;

        /**
         * Send an activate request to the tray app.
         * @param x 
         * @param y 
         */
        activate(x: number, y: number): void;

        /**
         * Send a secondary activate request to the tray app.
         * @param x 
         * @param y 
         */
        secondary_activate(x: number, y: number): void;

        /**
         * Send a scroll request to the tray app. valid values for the orientation are "horizontal" and "vertical".
         * @param delta 
         * @param orientation 
         */
        scroll(delta: number, orientation: string): void;

        to_json_string(): string;

        get_title(): string;

        get_category(): Category;

        get_status(): Status;

        get_tooltip(): Tooltip | null;

        get_tooltip_markup(): string;

        get_tooltip_text(): string;

        get_id(): string;

        get_is_menu(): boolean;

        get_icon_theme_path(): string;

        get_icon_name(): string;

        get_icon_pixbuf(): GdkPixbuf.Pixbuf;

        get_gicon(): Gio.Icon;

        get_item_id(): string;

        get_menu_path(): never;

        get_menu_model(): Gio.MenuModel | null;

        get_action_group(): Gio.ActionGroup | null;
    }


    namespace Tray {
        // Signal signatures
        interface SignalSignatures extends GObject.Object.SignalSignatures {
            /**
             * emitted when a new tray item was added.
             * @signal
             */
            "item-added": (arg0: string) => void;
            /**
             * emitted when a tray item was removed.
             * @signal
             */
            "item-removed": (arg0: string) => void;
            "notify::items": (pspec: GObject.ParamSpec) => void;
            "notify::items-model": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends GObject.Object.ConstructorProps {
            items: TrayItem[];
            items_model: Gio.ListModel;
            itemsModel: Gio.ListModel;
        }
    }

    /**
     * @gir-type Class
     */
    class Tray extends GObject.Object {
        static $gtype: GObject.GType<Tray>;

        // Properties
        /**
         * List of currently registered tray items
         * @read-only
         */
        get items(): TrayItem[];

        /**
         * ListModel containing the currently registered tray items.
         * @read-only
         */
        get items_model(): Gio.ListModel;

        /**
         * ListModel containing the currently registered tray items.
         * @read-only
         */
        get itemsModel(): Gio.ListModel;

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Tray.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Tray.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](): Tray;

        // Signals
        /** @signal */
        connect<K extends keyof Tray.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Tray.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Tray.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Tray.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Tray.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Tray.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Static methods
        /**
         * Get the singleton instance of {@link AstalTray.Tray}
         */
        static get_default(): Tray;

        // Methods
        /**
         * gets the TrayItem with the given item-id.
         * @param item_id 
         */
        get_item(item_id: string): TrayItem;

        get_items(): TrayItem[];

        get_items_model(): Gio.ListModel;
    }


    /**
     * @gir-type Alias
     */
    type TrayItemClass = typeof TrayItem;

    /**
     * @gir-type Struct
     */
    abstract class TrayItemPrivate {
        static $gtype: GObject.GType<TrayItemPrivate>;
    }


    /**
     * @gir-type Alias
     */
    type TrayClass = typeof Tray;

    /**
     * @gir-type Struct
     */
    abstract class TrayPrivate {
        static $gtype: GObject.GType<TrayPrivate>;
    }


    /**
     * @gir-type Struct
     */
    class Pixmap {
        static $gtype: GObject.GType<Pixmap>;

        // Fields
        width: number;

        height: number;

        bytes: Uint8Array;

        bytes_length1: number;

        // Constructors

        constructor(properties?: Partial<{
            width: number;
            height: number;
            bytes: Uint8Array;
            bytes_length1: number;
        }>);
    }


    /**
     * @gir-type Struct
     */
    class Tooltip {
        static $gtype: GObject.GType<Tooltip>;

        // Fields
        icon_name: string;

        icon: Pixmap[];

        icon_length1: number;

        title: string;

        description: string;

        // Constructors

        constructor(properties?: Partial<{
            icon_name: string;
            icon: Pixmap[];
            icon_length1: number;
            title: string;
            description: string;
        }>);
    }


    /**
     * Name of the imported GIR library
     * `see` https://gitlab.gnome.org/GNOME/gjs/-/blob/master/gi/ns.cpp#L188
     */
    const __name__: string;

    /**
     * Version of the imported GIR library
     * `see` https://gitlab.gnome.org/GNOME/gjs/-/blob/master/gi/ns.cpp#L189
     */
    const __version__: string;
}

export default AstalTray;

}

declare module 'gi://AstalTray' {
    import AstalTray01 from 'gi://AstalTray?version=0.1';
    export default AstalTray01;
}
// END
