/// <reference path="./astalio-0.1.d.ts" />
/// <reference path="./glib-2.0.d.ts" />
/// <reference path="./gobject-2.0.d.ts" />
/// <reference path="./gio-2.0.d.ts" />
/// <reference path="./gmodule-2.0.d.ts" />
/// <reference path="./gdk-3.0.d.ts" />
/// <reference path="./cairo-1.0.d.ts" />
/// <reference path="./cairo.d.ts" />
/// <reference path="./pango-1.0.d.ts" />
/// <reference path="./harfbuzz-0.0.d.ts" />
/// <reference path="./freetype2-2.0.d.ts" />
/// <reference path="./gdkpixbuf-2.0.d.ts" />
/// <reference path="./gtk-3.0.d.ts" />
/// <reference path="./xlib-2.0.d.ts" />
/// <reference path="./atk-1.0.d.ts" />

/**
 * Type Definitions for Gjs (https://gjs.guide/)
 *
 * These type definitions are automatically generated, do not edit them by hand.
 * If you found a bug fix it in `ts-for-gir` or create a bug report on https://github.com/gjsify/ts-for-gir
 *
 * The based EJS template file is used for the generated .d.ts file of each GIR module like Gtk-4.0, GObject-2.0, ...
 */

declare module 'gi://Astal?version=3.0' {

// Module dependencies
import type AstalIO from 'gi://AstalIO?version=0.1';
import type GLib from 'gi://GLib?version=2.0';
import type GObject from 'gi://GObject?version=2.0';
import type Gio from 'gi://Gio?version=2.0';
import type GModule from 'gi://GModule?version=2.0';
import type Gdk from 'gi://Gdk?version=3.0';
import type cairo from 'cairo';
import type Pango from 'gi://Pango?version=1.0';
import type HarfBuzz from 'gi://HarfBuzz?version=0.0';
import type freetype2 from 'gi://freetype2?version=2.0';
import type GdkPixbuf from 'gi://GdkPixbuf?version=2.0';
import type Gtk from 'gi://Gtk?version=3.0';
import type xlib from 'gi://xlib?version=2.0';
import type Atk from 'gi://Atk?version=1.0';

export namespace Astal {

    /**
     * Astal-3.0
     */


    /**
     * @gir-type Enum
     */
    export namespace MouseButton {
        export const $gtype: GObject.GType<MouseButton>;
    }

    /**
     * @gir-type Enum
     */
    enum MouseButton {
        PRIMARY,
        MIDDLE,
        SECONDARY,
        BACK,
        FORWARD,
    }


    /**
     * @gir-type Enum
     */
    export namespace Exclusivity {
        export const $gtype: GObject.GType<Exclusivity>;
    }

    /**
     * @gir-type Enum
     */
    enum Exclusivity {
        NORMAL,
        /**
         * Request the compositor to allocate space for this window.
         */
        EXCLUSIVE,
        /**
         * Request the compositor to stack layers on top of each other.
         */
        IGNORE,
    }


    /**
     * @gir-type Enum
     */
    export namespace Layer {
        export const $gtype: GObject.GType<Layer>;
    }

    /**
     * @gir-type Enum
     */
    enum Layer {
        BACKGROUND,
        BOTTOM,
        TOP,
        OVERLAY,
    }


    /**
     * @gir-type Enum
     */
    export namespace Keymode {
        export const $gtype: GObject.GType<Keymode>;
    }

    /**
     * @gir-type Enum
     */
    enum Keymode {
        /**
         * Window should not receive keyboard events.
         */
        NONE,
        /**
         * Window should have exclusive focus if it is on the top or overlay layer.
         */
        EXCLUSIVE,
        /**
         * Focus and Unfocues the window as needed.
         */
        ON_DEMAND,
    }


    const MAJOR_VERSION: number;

    const MINOR_VERSION: number;

    const MICRO_VERSION: number;

    const VERSION: string;

    /**
     * @param widget 
     * @param css 
     */
    function widget_set_css(widget: Gtk.Widget, css: string): void;

    /**
     * @param widget 
     */
    function widget_get_css(widget: Gtk.Widget): string;

    /**
     * @param widget 
     * @param class_names 
     */
    function widget_set_class_names(widget: Gtk.Widget, class_names: string[]): void;

    /**
     * @param widget 
     */
    function widget_get_class_names(widget: Gtk.Widget): string[];

    /**
     * @param widget 
     * @param class_name 
     * @param condition 
     */
    function widget_toggle_class_name(widget: Gtk.Widget, class_name: string, condition: boolean): void;

    /**
     * @param widget 
     * @param cursor 
     */
    function widget_set_cursor(widget: Gtk.Widget, cursor: string): void;

    /**
     * @param widget 
     */
    function widget_get_cursor(widget: Gtk.Widget): string;

    /**
     * @param widget 
     * @param click_through 
     */
    function widget_set_click_through(widget: Gtk.Widget, click_through: boolean): void;

    /**
     * @param widget 
     */
    function widget_get_click_through(widget: Gtk.Widget): boolean;

    /**
     * @gir-type Flags
     */
    export namespace WindowAnchor {
        export const $gtype: GObject.GType<WindowAnchor>;
    }

    /**
     * @gir-type Flags
     */
    enum WindowAnchor {
        NONE,
        TOP,
        RIGHT,
        LEFT,
        BOTTOM,
    }


    namespace Box {
        // Signal signatures
        interface SignalSignatures extends Gtk.Box.SignalSignatures {
            "notify::vertical": (pspec: GObject.ParamSpec) => void;
            "notify::children": (pspec: GObject.ParamSpec) => void;
            "notify::child": (pspec: GObject.ParamSpec) => void;
            "notify::baseline-position": (pspec: GObject.ParamSpec) => void;
            "notify::homogeneous": (pspec: GObject.ParamSpec) => void;
            "notify::spacing": (pspec: GObject.ParamSpec) => void;
            "notify::border-width": (pspec: GObject.ParamSpec) => void;
            "notify::resize-mode": (pspec: GObject.ParamSpec) => void;
            "notify::app-paintable": (pspec: GObject.ParamSpec) => void;
            "notify::can-default": (pspec: GObject.ParamSpec) => void;
            "notify::can-focus": (pspec: GObject.ParamSpec) => void;
            "notify::composite-child": (pspec: GObject.ParamSpec) => void;
            "notify::double-buffered": (pspec: GObject.ParamSpec) => void;
            "notify::events": (pspec: GObject.ParamSpec) => void;
            "notify::expand": (pspec: GObject.ParamSpec) => void;
            "notify::focus-on-click": (pspec: GObject.ParamSpec) => void;
            "notify::halign": (pspec: GObject.ParamSpec) => void;
            "notify::has-default": (pspec: GObject.ParamSpec) => void;
            "notify::has-focus": (pspec: GObject.ParamSpec) => void;
            "notify::has-tooltip": (pspec: GObject.ParamSpec) => void;
            "notify::height-request": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::is-focus": (pspec: GObject.ParamSpec) => void;
            "notify::margin": (pspec: GObject.ParamSpec) => void;
            "notify::margin-bottom": (pspec: GObject.ParamSpec) => void;
            "notify::margin-end": (pspec: GObject.ParamSpec) => void;
            "notify::margin-left": (pspec: GObject.ParamSpec) => void;
            "notify::margin-right": (pspec: GObject.ParamSpec) => void;
            "notify::margin-start": (pspec: GObject.ParamSpec) => void;
            "notify::margin-top": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::no-show-all": (pspec: GObject.ParamSpec) => void;
            "notify::opacity": (pspec: GObject.ParamSpec) => void;
            "notify::parent": (pspec: GObject.ParamSpec) => void;
            "notify::receives-default": (pspec: GObject.ParamSpec) => void;
            "notify::scale-factor": (pspec: GObject.ParamSpec) => void;
            "notify::sensitive": (pspec: GObject.ParamSpec) => void;
            "notify::style": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-markup": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-text": (pspec: GObject.ParamSpec) => void;
            "notify::valign": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::visible": (pspec: GObject.ParamSpec) => void;
            "notify::width-request": (pspec: GObject.ParamSpec) => void;
            "notify::window": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Gtk.Box.ConstructorProps {
            vertical: boolean;
            children: Gtk.Widget[];
            child: Gtk.Widget;
        }
    }

    /**
     * @gir-type Class
     */
    class Box extends Gtk.Box {
        static $gtype: GObject.GType<Box>;

        // Properties
        /**
         * Corresponds to [property@Gtk.Orientable :orientation].
         */
        get vertical(): boolean;
        set vertical(val: boolean);

        get children(): Gtk.Widget[];
        set children(val: Gtk.Widget[]);

        get child(): Gtk.Widget;
        set child(val: Gtk.Widget);

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Box.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Box.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](vertical: boolean, children: Gtk.Widget[]): Box;

        // Conflicted with Gtk.Box.new
        static ["new"](...args: never[]): any;

        // Signals
        /** @signal */
        connect<K extends keyof Box.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Box.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Box.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Box.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Box.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Box.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        get_vertical(): boolean;

        /**
         * @param value 
         */
        set_vertical(value: boolean): void;

        get_children(): Gtk.Widget[];

        /**
         * @param value 
         */
        set_children(value: Gtk.Widget[]): void;

        get_child(): Gtk.Widget;

        /**
         * @param value 
         */
        set_child(value: Gtk.Widget): void;
    }


    namespace Button {
        // Signal signatures
        interface SignalSignatures extends Gtk.Button.SignalSignatures {
            /**
             * @signal
             */
            hover: (arg0: HoverEvent) => void;
            /**
             * @signal
             */
            "hover-lost": (arg0: HoverEvent) => void;
            /**
             * @signal
             */
            click: (arg0: ClickEvent) => void;
            /**
             * @signal
             */
            "click-release": (arg0: ClickEvent) => void;
            /**
             * @signal
             */
            scroll: (arg0: ScrollEvent) => void;
            "notify::always-show-image": (pspec: GObject.ParamSpec) => void;
            "notify::image": (pspec: GObject.ParamSpec) => void;
            "notify::image-position": (pspec: GObject.ParamSpec) => void;
            "notify::label": (pspec: GObject.ParamSpec) => void;
            "notify::relief": (pspec: GObject.ParamSpec) => void;
            "notify::use-stock": (pspec: GObject.ParamSpec) => void;
            "notify::use-underline": (pspec: GObject.ParamSpec) => void;
            "notify::xalign": (pspec: GObject.ParamSpec) => void;
            "notify::yalign": (pspec: GObject.ParamSpec) => void;
            "notify::border-width": (pspec: GObject.ParamSpec) => void;
            "notify::child": (pspec: GObject.ParamSpec) => void;
            "notify::resize-mode": (pspec: GObject.ParamSpec) => void;
            "notify::app-paintable": (pspec: GObject.ParamSpec) => void;
            "notify::can-default": (pspec: GObject.ParamSpec) => void;
            "notify::can-focus": (pspec: GObject.ParamSpec) => void;
            "notify::composite-child": (pspec: GObject.ParamSpec) => void;
            "notify::double-buffered": (pspec: GObject.ParamSpec) => void;
            "notify::events": (pspec: GObject.ParamSpec) => void;
            "notify::expand": (pspec: GObject.ParamSpec) => void;
            "notify::focus-on-click": (pspec: GObject.ParamSpec) => void;
            "notify::halign": (pspec: GObject.ParamSpec) => void;
            "notify::has-default": (pspec: GObject.ParamSpec) => void;
            "notify::has-focus": (pspec: GObject.ParamSpec) => void;
            "notify::has-tooltip": (pspec: GObject.ParamSpec) => void;
            "notify::height-request": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::is-focus": (pspec: GObject.ParamSpec) => void;
            "notify::margin": (pspec: GObject.ParamSpec) => void;
            "notify::margin-bottom": (pspec: GObject.ParamSpec) => void;
            "notify::margin-end": (pspec: GObject.ParamSpec) => void;
            "notify::margin-left": (pspec: GObject.ParamSpec) => void;
            "notify::margin-right": (pspec: GObject.ParamSpec) => void;
            "notify::margin-start": (pspec: GObject.ParamSpec) => void;
            "notify::margin-top": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::no-show-all": (pspec: GObject.ParamSpec) => void;
            "notify::opacity": (pspec: GObject.ParamSpec) => void;
            "notify::parent": (pspec: GObject.ParamSpec) => void;
            "notify::receives-default": (pspec: GObject.ParamSpec) => void;
            "notify::scale-factor": (pspec: GObject.ParamSpec) => void;
            "notify::sensitive": (pspec: GObject.ParamSpec) => void;
            "notify::style": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-markup": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-text": (pspec: GObject.ParamSpec) => void;
            "notify::valign": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::visible": (pspec: GObject.ParamSpec) => void;
            "notify::width-request": (pspec: GObject.ParamSpec) => void;
            "notify::window": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Gtk.Button.ConstructorProps {}
    }

    /**
     * This button has no extra functionality on top if its base {@link Gtk.Button} class.
     * The purpose of this Button subclass is to have a destructable struct as the argument in GJS event handlers.
     * @gir-type Class
     */
    class Button extends Gtk.Button {
        static $gtype: GObject.GType<Button>;

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Button.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Button.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](): Button;

        // Signals
        /** @signal */
        connect<K extends keyof Button.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Button.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Button.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Button.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Button.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Button.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;
    }


    namespace CenterBox {
        // Signal signatures
        interface SignalSignatures extends Gtk.Box.SignalSignatures {
            "notify::vertical": (pspec: GObject.ParamSpec) => void;
            "notify::start-widget": (pspec: GObject.ParamSpec) => void;
            "notify::end-widget": (pspec: GObject.ParamSpec) => void;
            "notify::center-widget": (pspec: GObject.ParamSpec) => void;
            "notify::baseline-position": (pspec: GObject.ParamSpec) => void;
            "notify::homogeneous": (pspec: GObject.ParamSpec) => void;
            "notify::spacing": (pspec: GObject.ParamSpec) => void;
            "notify::border-width": (pspec: GObject.ParamSpec) => void;
            "notify::child": (pspec: GObject.ParamSpec) => void;
            "notify::resize-mode": (pspec: GObject.ParamSpec) => void;
            "notify::app-paintable": (pspec: GObject.ParamSpec) => void;
            "notify::can-default": (pspec: GObject.ParamSpec) => void;
            "notify::can-focus": (pspec: GObject.ParamSpec) => void;
            "notify::composite-child": (pspec: GObject.ParamSpec) => void;
            "notify::double-buffered": (pspec: GObject.ParamSpec) => void;
            "notify::events": (pspec: GObject.ParamSpec) => void;
            "notify::expand": (pspec: GObject.ParamSpec) => void;
            "notify::focus-on-click": (pspec: GObject.ParamSpec) => void;
            "notify::halign": (pspec: GObject.ParamSpec) => void;
            "notify::has-default": (pspec: GObject.ParamSpec) => void;
            "notify::has-focus": (pspec: GObject.ParamSpec) => void;
            "notify::has-tooltip": (pspec: GObject.ParamSpec) => void;
            "notify::height-request": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::is-focus": (pspec: GObject.ParamSpec) => void;
            "notify::margin": (pspec: GObject.ParamSpec) => void;
            "notify::margin-bottom": (pspec: GObject.ParamSpec) => void;
            "notify::margin-end": (pspec: GObject.ParamSpec) => void;
            "notify::margin-left": (pspec: GObject.ParamSpec) => void;
            "notify::margin-right": (pspec: GObject.ParamSpec) => void;
            "notify::margin-start": (pspec: GObject.ParamSpec) => void;
            "notify::margin-top": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::no-show-all": (pspec: GObject.ParamSpec) => void;
            "notify::opacity": (pspec: GObject.ParamSpec) => void;
            "notify::parent": (pspec: GObject.ParamSpec) => void;
            "notify::receives-default": (pspec: GObject.ParamSpec) => void;
            "notify::scale-factor": (pspec: GObject.ParamSpec) => void;
            "notify::sensitive": (pspec: GObject.ParamSpec) => void;
            "notify::style": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-markup": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-text": (pspec: GObject.ParamSpec) => void;
            "notify::valign": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::visible": (pspec: GObject.ParamSpec) => void;
            "notify::width-request": (pspec: GObject.ParamSpec) => void;
            "notify::window": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Gtk.Box.ConstructorProps, Gtk.Buildable.ConstructorProps {
            vertical: boolean;
            start_widget: Gtk.Widget;
            startWidget: Gtk.Widget;
            end_widget: Gtk.Widget;
            endWidget: Gtk.Widget;
            center_widget: Gtk.Widget;
            centerWidget: Gtk.Widget;
        }
    }

    /**
     * @gir-type Class
     */
    class CenterBox extends Gtk.Box implements Gtk.Buildable {
        static $gtype: GObject.GType<CenterBox>;

        // Properties
        /**
         * Corresponds to [property@Gtk.Orientable :orientation].
         */
        get vertical(): boolean;
        set vertical(val: boolean);

        get start_widget(): Gtk.Widget;
        set start_widget(val: Gtk.Widget);

        get startWidget(): Gtk.Widget;
        set startWidget(val: Gtk.Widget);

        get end_widget(): Gtk.Widget;
        set end_widget(val: Gtk.Widget);

        get endWidget(): Gtk.Widget;
        set endWidget(val: Gtk.Widget);

        get center_widget(): Gtk.Widget;
        set center_widget(val: Gtk.Widget);

        get centerWidget(): Gtk.Widget;
        set centerWidget(val: Gtk.Widget);

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: CenterBox.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<CenterBox.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](): CenterBox;

        // Signals
        /** @signal */
        connect<K extends keyof CenterBox.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, CenterBox.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof CenterBox.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, CenterBox.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof CenterBox.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<CenterBox.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        get_vertical(): boolean;

        /**
         * @param value 
         */
        set_vertical(value: boolean): void;

        get_start_widget(): Gtk.Widget;

        /**
         * @param value 
         */
        set_start_widget(value: Gtk.Widget): void;

        get_end_widget(): Gtk.Widget;

        /**
         * @param value 
         */
        set_end_widget(value: Gtk.Widget): void;

        get_center_widget(): Gtk.Widget;

        /**
         * @param args 
         */
    // Conflicted with Gtk.Box.get_center_widget
        get_center_widget(...args: never[]): any;

        /**
         * @param value 
         */
        set_center_widget(value: Gtk.Widget): void;

        /**
         * @param args 
         */
    // Conflicted with Gtk.Box.set_center_widget
        set_center_widget(...args: never[]): any;
    }


    namespace CircularProgress {
        // Signal signatures
        interface SignalSignatures extends Gtk.Bin.SignalSignatures {
            "notify::start-at": (pspec: GObject.ParamSpec) => void;
            "notify::end-at": (pspec: GObject.ParamSpec) => void;
            "notify::value": (pspec: GObject.ParamSpec) => void;
            "notify::inverted": (pspec: GObject.ParamSpec) => void;
            "notify::rounded": (pspec: GObject.ParamSpec) => void;
            "notify::border-width": (pspec: GObject.ParamSpec) => void;
            "notify::child": (pspec: GObject.ParamSpec) => void;
            "notify::resize-mode": (pspec: GObject.ParamSpec) => void;
            "notify::app-paintable": (pspec: GObject.ParamSpec) => void;
            "notify::can-default": (pspec: GObject.ParamSpec) => void;
            "notify::can-focus": (pspec: GObject.ParamSpec) => void;
            "notify::composite-child": (pspec: GObject.ParamSpec) => void;
            "notify::double-buffered": (pspec: GObject.ParamSpec) => void;
            "notify::events": (pspec: GObject.ParamSpec) => void;
            "notify::expand": (pspec: GObject.ParamSpec) => void;
            "notify::focus-on-click": (pspec: GObject.ParamSpec) => void;
            "notify::halign": (pspec: GObject.ParamSpec) => void;
            "notify::has-default": (pspec: GObject.ParamSpec) => void;
            "notify::has-focus": (pspec: GObject.ParamSpec) => void;
            "notify::has-tooltip": (pspec: GObject.ParamSpec) => void;
            "notify::height-request": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::is-focus": (pspec: GObject.ParamSpec) => void;
            "notify::margin": (pspec: GObject.ParamSpec) => void;
            "notify::margin-bottom": (pspec: GObject.ParamSpec) => void;
            "notify::margin-end": (pspec: GObject.ParamSpec) => void;
            "notify::margin-left": (pspec: GObject.ParamSpec) => void;
            "notify::margin-right": (pspec: GObject.ParamSpec) => void;
            "notify::margin-start": (pspec: GObject.ParamSpec) => void;
            "notify::margin-top": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::no-show-all": (pspec: GObject.ParamSpec) => void;
            "notify::opacity": (pspec: GObject.ParamSpec) => void;
            "notify::parent": (pspec: GObject.ParamSpec) => void;
            "notify::receives-default": (pspec: GObject.ParamSpec) => void;
            "notify::scale-factor": (pspec: GObject.ParamSpec) => void;
            "notify::sensitive": (pspec: GObject.ParamSpec) => void;
            "notify::style": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-markup": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-text": (pspec: GObject.ParamSpec) => void;
            "notify::valign": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::visible": (pspec: GObject.ParamSpec) => void;
            "notify::width-request": (pspec: GObject.ParamSpec) => void;
            "notify::window": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Gtk.Bin.ConstructorProps {
            start_at: number;
            startAt: number;
            end_at: number;
            endAt: number;
            value: number;
            inverted: boolean;
            rounded: boolean;
        }
    }

    /**
     * CircularProgress is a subclass of {@link Gtk.Bin} which provides a circular progress bar with customizable properties such as starting 
     * and ending points, progress value, and visual features like rounded ends and inversion of progress direction.
     * @gir-type Class
     */
    class CircularProgress extends Gtk.Bin {
        static $gtype: GObject.GType<CircularProgress>;

        // Properties
        /**
         * The starting point of the progress circle, where 0 represents 3 o'clock position or 0° degrees and 1 represents 360°.
         */
        get start_at(): number;
        set start_at(val: number);

        /**
         * The starting point of the progress circle, where 0 represents 3 o'clock position or 0° degrees and 1 represents 360°.
         */
        get startAt(): number;
        set startAt(val: number);

        /**
         * The cutoff point of the background color of the progress circle.
         */
        get end_at(): number;
        set end_at(val: number);

        /**
         * The cutoff point of the background color of the progress circle.
         */
        get endAt(): number;
        set endAt(val: number);

        /**
         * The value which determines the arc of the drawn foreground color. Should be a value between 0 and 1.
         */
        get value(): number;
        set value(val: number);

        /**
         * Inverts the progress direction, making it draw counterclockwise.
         */
        get inverted(): boolean;
        set inverted(val: boolean);

        /**
         * Renders rounded ends at both the start and the end of the progress bar.
         */
        get rounded(): boolean;
        set rounded(val: boolean);

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: CircularProgress.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<CircularProgress.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](): CircularProgress;

        // Signals
        /** @signal */
        connect<K extends keyof CircularProgress.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, CircularProgress.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof CircularProgress.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, CircularProgress.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof CircularProgress.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<CircularProgress.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        get_start_at(): number;

        /**
         * @param value 
         */
        set_start_at(value: number): void;

        get_end_at(): number;

        /**
         * @param value 
         */
        set_end_at(value: number): void;

        get_value(): number;

        /**
         * @param value 
         */
        set_value(value: number): void;

        get_inverted(): boolean;

        /**
         * @param value 
         */
        set_inverted(value: boolean): void;

        get_rounded(): boolean;

        /**
         * @param value 
         */
        set_rounded(value: boolean): void;
    }


    namespace EventBox {
        // Signal signatures
        interface SignalSignatures extends Gtk.EventBox.SignalSignatures {
            /**
             * @signal
             */
            hover: (arg0: HoverEvent) => void;
            /**
             * @signal
             */
            "hover-lost": (arg0: HoverEvent) => void;
            /**
             * @signal
             */
            click: (arg0: ClickEvent) => void;
            /**
             * @signal
             */
            "click-release": (arg0: ClickEvent) => void;
            /**
             * @signal
             */
            scroll: (arg0: ScrollEvent) => void;
            /**
             * @signal
             */
            motion: (arg0: MotionEvent) => void;
            "notify::above-child": (pspec: GObject.ParamSpec) => void;
            "notify::visible-window": (pspec: GObject.ParamSpec) => void;
            "notify::border-width": (pspec: GObject.ParamSpec) => void;
            "notify::child": (pspec: GObject.ParamSpec) => void;
            "notify::resize-mode": (pspec: GObject.ParamSpec) => void;
            "notify::app-paintable": (pspec: GObject.ParamSpec) => void;
            "notify::can-default": (pspec: GObject.ParamSpec) => void;
            "notify::can-focus": (pspec: GObject.ParamSpec) => void;
            "notify::composite-child": (pspec: GObject.ParamSpec) => void;
            "notify::double-buffered": (pspec: GObject.ParamSpec) => void;
            "notify::events": (pspec: GObject.ParamSpec) => void;
            "notify::expand": (pspec: GObject.ParamSpec) => void;
            "notify::focus-on-click": (pspec: GObject.ParamSpec) => void;
            "notify::halign": (pspec: GObject.ParamSpec) => void;
            "notify::has-default": (pspec: GObject.ParamSpec) => void;
            "notify::has-focus": (pspec: GObject.ParamSpec) => void;
            "notify::has-tooltip": (pspec: GObject.ParamSpec) => void;
            "notify::height-request": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::is-focus": (pspec: GObject.ParamSpec) => void;
            "notify::margin": (pspec: GObject.ParamSpec) => void;
            "notify::margin-bottom": (pspec: GObject.ParamSpec) => void;
            "notify::margin-end": (pspec: GObject.ParamSpec) => void;
            "notify::margin-left": (pspec: GObject.ParamSpec) => void;
            "notify::margin-right": (pspec: GObject.ParamSpec) => void;
            "notify::margin-start": (pspec: GObject.ParamSpec) => void;
            "notify::margin-top": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::no-show-all": (pspec: GObject.ParamSpec) => void;
            "notify::opacity": (pspec: GObject.ParamSpec) => void;
            "notify::parent": (pspec: GObject.ParamSpec) => void;
            "notify::receives-default": (pspec: GObject.ParamSpec) => void;
            "notify::scale-factor": (pspec: GObject.ParamSpec) => void;
            "notify::sensitive": (pspec: GObject.ParamSpec) => void;
            "notify::style": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-markup": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-text": (pspec: GObject.ParamSpec) => void;
            "notify::valign": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::visible": (pspec: GObject.ParamSpec) => void;
            "notify::width-request": (pspec: GObject.ParamSpec) => void;
            "notify::window": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Gtk.EventBox.ConstructorProps {}
    }

    /**
     * EventBox is a {@link Gtk.EventBox} subclass which is meant to fix an issue with its `Gtk.Widget::enter_notify_event` and 
     * `Gtk.Widget::leave_notify_event` when nesting EventBoxes
     * Its css selector is `eventbox`.
     * @gir-type Class
     */
    class EventBox extends Gtk.EventBox {
        static $gtype: GObject.GType<EventBox>;

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: EventBox.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<EventBox.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](): EventBox;

        // Signals
        /** @signal */
        connect<K extends keyof EventBox.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, EventBox.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof EventBox.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, EventBox.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof EventBox.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<EventBox.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;
    }


    namespace Icon {
        // Signal signatures
        interface SignalSignatures extends Gtk.Image.SignalSignatures {
            "notify::pixbuf": (pspec: GObject.ParamSpec) => void;
            "notify::g-icon": (pspec: GObject.ParamSpec) => void;
            "notify::icon": (pspec: GObject.ParamSpec) => void;
            "notify::file": (pspec: GObject.ParamSpec) => void;
            "notify::gicon": (pspec: GObject.ParamSpec) => void;
            "notify::icon-name": (pspec: GObject.ParamSpec) => void;
            "notify::icon-set": (pspec: GObject.ParamSpec) => void;
            "notify::icon-size": (pspec: GObject.ParamSpec) => void;
            "notify::pixbuf-animation": (pspec: GObject.ParamSpec) => void;
            "notify::pixel-size": (pspec: GObject.ParamSpec) => void;
            "notify::resource": (pspec: GObject.ParamSpec) => void;
            "notify::stock": (pspec: GObject.ParamSpec) => void;
            "notify::storage-type": (pspec: GObject.ParamSpec) => void;
            "notify::surface": (pspec: GObject.ParamSpec) => void;
            "notify::use-fallback": (pspec: GObject.ParamSpec) => void;
            "notify::xalign": (pspec: GObject.ParamSpec) => void;
            "notify::xpad": (pspec: GObject.ParamSpec) => void;
            "notify::yalign": (pspec: GObject.ParamSpec) => void;
            "notify::ypad": (pspec: GObject.ParamSpec) => void;
            "notify::app-paintable": (pspec: GObject.ParamSpec) => void;
            "notify::can-default": (pspec: GObject.ParamSpec) => void;
            "notify::can-focus": (pspec: GObject.ParamSpec) => void;
            "notify::composite-child": (pspec: GObject.ParamSpec) => void;
            "notify::double-buffered": (pspec: GObject.ParamSpec) => void;
            "notify::events": (pspec: GObject.ParamSpec) => void;
            "notify::expand": (pspec: GObject.ParamSpec) => void;
            "notify::focus-on-click": (pspec: GObject.ParamSpec) => void;
            "notify::halign": (pspec: GObject.ParamSpec) => void;
            "notify::has-default": (pspec: GObject.ParamSpec) => void;
            "notify::has-focus": (pspec: GObject.ParamSpec) => void;
            "notify::has-tooltip": (pspec: GObject.ParamSpec) => void;
            "notify::height-request": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::is-focus": (pspec: GObject.ParamSpec) => void;
            "notify::margin": (pspec: GObject.ParamSpec) => void;
            "notify::margin-bottom": (pspec: GObject.ParamSpec) => void;
            "notify::margin-end": (pspec: GObject.ParamSpec) => void;
            "notify::margin-left": (pspec: GObject.ParamSpec) => void;
            "notify::margin-right": (pspec: GObject.ParamSpec) => void;
            "notify::margin-start": (pspec: GObject.ParamSpec) => void;
            "notify::margin-top": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::no-show-all": (pspec: GObject.ParamSpec) => void;
            "notify::opacity": (pspec: GObject.ParamSpec) => void;
            "notify::parent": (pspec: GObject.ParamSpec) => void;
            "notify::receives-default": (pspec: GObject.ParamSpec) => void;
            "notify::scale-factor": (pspec: GObject.ParamSpec) => void;
            "notify::sensitive": (pspec: GObject.ParamSpec) => void;
            "notify::style": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-markup": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-text": (pspec: GObject.ParamSpec) => void;
            "notify::valign": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::visible": (pspec: GObject.ParamSpec) => void;
            "notify::width-request": (pspec: GObject.ParamSpec) => void;
            "notify::window": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Gtk.Image.ConstructorProps {
            pixbuf: GdkPixbuf.Pixbuf | any;
            g_icon: Gio.Icon;
            gIcon: Gio.Icon;
            icon: string;
        }
    }

    /**
     * {@link Gtk.Image} subclass meant to be used only for icons.
     * It's size is calculated from `font-size` css property. Its css selector is `icon`.
     * @gir-type Class
     */
    class Icon extends Gtk.Image {
        static $gtype: GObject.GType<Icon>;

        // Properties
    // This accessor conflicts with another accessor's type in a parent class or interface.
        get pixbuf(): GdkPixbuf.Pixbuf | any;
    // This accessor conflicts with another accessor's type in a parent class or interface.
        set pixbuf(val: GdkPixbuf.Pixbuf | any);

        /**
         * @deprecated since 0.1.0
         */
        get g_icon(): Gio.Icon;
        set g_icon(val: Gio.Icon);

        /**
         * @deprecated since 0.1.0
         */
        get gIcon(): Gio.Icon;
        set gIcon(val: Gio.Icon);

        /**
         * Either a named icon or a path to a file.
         */
        get icon(): string;
        set icon(val: string);

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Icon.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Icon.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](): Icon;

        // Signals
        /** @signal */
        connect<K extends keyof Icon.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Icon.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Icon.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Icon.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Icon.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Icon.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Static methods
        /**
         * @param icon 
         */
        static lookup_icon(icon: string): Gtk.IconInfo | null;

        // Methods
        get_pixbuf(): GdkPixbuf.Pixbuf;

        /**
         * @param args 
         */
    // Conflicted with Gtk.Image.get_pixbuf
        get_pixbuf(...args: never[]): any;

        /**
         * @param value 
         */
        set_pixbuf(value: GdkPixbuf.Pixbuf): void;

        get_g_icon(): Gio.Icon;

        /**
         * @param value 
         */
        set_g_icon(value: Gio.Icon): void;

        get_icon(): string;

        /**
         * @param value 
         */
        set_icon(value: string): void;
    }


    namespace Label {
        // Signal signatures
        interface SignalSignatures extends Gtk.Label.SignalSignatures {
            "notify::truncate": (pspec: GObject.ParamSpec) => void;
            "notify::justify-fill": (pspec: GObject.ParamSpec) => void;
            "notify::angle": (pspec: GObject.ParamSpec) => void;
            "notify::attributes": (pspec: GObject.ParamSpec) => void;
            "notify::cursor-position": (pspec: GObject.ParamSpec) => void;
            "notify::ellipsize": (pspec: GObject.ParamSpec) => void;
            "notify::justify": (pspec: GObject.ParamSpec) => void;
            "notify::label": (pspec: GObject.ParamSpec) => void;
            "notify::lines": (pspec: GObject.ParamSpec) => void;
            "notify::max-width-chars": (pspec: GObject.ParamSpec) => void;
            "notify::mnemonic-keyval": (pspec: GObject.ParamSpec) => void;
            "notify::mnemonic-widget": (pspec: GObject.ParamSpec) => void;
            "notify::pattern": (pspec: GObject.ParamSpec) => void;
            "notify::selectable": (pspec: GObject.ParamSpec) => void;
            "notify::selection-bound": (pspec: GObject.ParamSpec) => void;
            "notify::single-line-mode": (pspec: GObject.ParamSpec) => void;
            "notify::track-visited-links": (pspec: GObject.ParamSpec) => void;
            "notify::use-markup": (pspec: GObject.ParamSpec) => void;
            "notify::use-underline": (pspec: GObject.ParamSpec) => void;
            "notify::width-chars": (pspec: GObject.ParamSpec) => void;
            "notify::wrap": (pspec: GObject.ParamSpec) => void;
            "notify::wrap-mode": (pspec: GObject.ParamSpec) => void;
            "notify::xalign": (pspec: GObject.ParamSpec) => void;
            "notify::yalign": (pspec: GObject.ParamSpec) => void;
            "notify::xpad": (pspec: GObject.ParamSpec) => void;
            "notify::ypad": (pspec: GObject.ParamSpec) => void;
            "notify::app-paintable": (pspec: GObject.ParamSpec) => void;
            "notify::can-default": (pspec: GObject.ParamSpec) => void;
            "notify::can-focus": (pspec: GObject.ParamSpec) => void;
            "notify::composite-child": (pspec: GObject.ParamSpec) => void;
            "notify::double-buffered": (pspec: GObject.ParamSpec) => void;
            "notify::events": (pspec: GObject.ParamSpec) => void;
            "notify::expand": (pspec: GObject.ParamSpec) => void;
            "notify::focus-on-click": (pspec: GObject.ParamSpec) => void;
            "notify::halign": (pspec: GObject.ParamSpec) => void;
            "notify::has-default": (pspec: GObject.ParamSpec) => void;
            "notify::has-focus": (pspec: GObject.ParamSpec) => void;
            "notify::has-tooltip": (pspec: GObject.ParamSpec) => void;
            "notify::height-request": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::is-focus": (pspec: GObject.ParamSpec) => void;
            "notify::margin": (pspec: GObject.ParamSpec) => void;
            "notify::margin-bottom": (pspec: GObject.ParamSpec) => void;
            "notify::margin-end": (pspec: GObject.ParamSpec) => void;
            "notify::margin-left": (pspec: GObject.ParamSpec) => void;
            "notify::margin-right": (pspec: GObject.ParamSpec) => void;
            "notify::margin-start": (pspec: GObject.ParamSpec) => void;
            "notify::margin-top": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::no-show-all": (pspec: GObject.ParamSpec) => void;
            "notify::opacity": (pspec: GObject.ParamSpec) => void;
            "notify::parent": (pspec: GObject.ParamSpec) => void;
            "notify::receives-default": (pspec: GObject.ParamSpec) => void;
            "notify::scale-factor": (pspec: GObject.ParamSpec) => void;
            "notify::sensitive": (pspec: GObject.ParamSpec) => void;
            "notify::style": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-markup": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-text": (pspec: GObject.ParamSpec) => void;
            "notify::valign": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::visible": (pspec: GObject.ParamSpec) => void;
            "notify::width-request": (pspec: GObject.ParamSpec) => void;
            "notify::window": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Gtk.Label.ConstructorProps {
            truncate: boolean;
            justify_fill: boolean;
            justifyFill: boolean;
        }
    }

    /**
     * @gir-type Class
     */
    class Label extends Gtk.Label {
        static $gtype: GObject.GType<Label>;

        // Properties
        /**
         * Shortcut for setting {@link Gtk.Label.ellipsize} to {@link Pango.EllipsizeMode.END}
         */
        get truncate(): boolean;
        set truncate(val: boolean);

        /**
         * Shortcut for setting {@link Gtk.Label.justify} to {@link Gtk.Justification.FILL}
         */
        get justify_fill(): boolean;
        set justify_fill(val: boolean);

        /**
         * Shortcut for setting {@link Gtk.Label.justify} to {@link Gtk.Justification.FILL}
         */
        get justifyFill(): boolean;
        set justifyFill(val: boolean);

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Label.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Label.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](): Label;

        // Signals
        /** @signal */
        connect<K extends keyof Label.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Label.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Label.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Label.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Label.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Label.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        get_truncate(): boolean;

        /**
         * @param value 
         */
        set_truncate(value: boolean): void;

        get_justify_fill(): boolean;

        /**
         * @param value 
         */
        set_justify_fill(value: boolean): void;
    }


    namespace LevelBar {
        // Signal signatures
        interface SignalSignatures extends Gtk.LevelBar.SignalSignatures {
            "notify::vertical": (pspec: GObject.ParamSpec) => void;
            "notify::inverted": (pspec: GObject.ParamSpec) => void;
            "notify::max-value": (pspec: GObject.ParamSpec) => void;
            "notify::min-value": (pspec: GObject.ParamSpec) => void;
            "notify::mode": (pspec: GObject.ParamSpec) => void;
            "notify::value": (pspec: GObject.ParamSpec) => void;
            "notify::app-paintable": (pspec: GObject.ParamSpec) => void;
            "notify::can-default": (pspec: GObject.ParamSpec) => void;
            "notify::can-focus": (pspec: GObject.ParamSpec) => void;
            "notify::composite-child": (pspec: GObject.ParamSpec) => void;
            "notify::double-buffered": (pspec: GObject.ParamSpec) => void;
            "notify::events": (pspec: GObject.ParamSpec) => void;
            "notify::expand": (pspec: GObject.ParamSpec) => void;
            "notify::focus-on-click": (pspec: GObject.ParamSpec) => void;
            "notify::halign": (pspec: GObject.ParamSpec) => void;
            "notify::has-default": (pspec: GObject.ParamSpec) => void;
            "notify::has-focus": (pspec: GObject.ParamSpec) => void;
            "notify::has-tooltip": (pspec: GObject.ParamSpec) => void;
            "notify::height-request": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::is-focus": (pspec: GObject.ParamSpec) => void;
            "notify::margin": (pspec: GObject.ParamSpec) => void;
            "notify::margin-bottom": (pspec: GObject.ParamSpec) => void;
            "notify::margin-end": (pspec: GObject.ParamSpec) => void;
            "notify::margin-left": (pspec: GObject.ParamSpec) => void;
            "notify::margin-right": (pspec: GObject.ParamSpec) => void;
            "notify::margin-start": (pspec: GObject.ParamSpec) => void;
            "notify::margin-top": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::no-show-all": (pspec: GObject.ParamSpec) => void;
            "notify::opacity": (pspec: GObject.ParamSpec) => void;
            "notify::parent": (pspec: GObject.ParamSpec) => void;
            "notify::receives-default": (pspec: GObject.ParamSpec) => void;
            "notify::scale-factor": (pspec: GObject.ParamSpec) => void;
            "notify::sensitive": (pspec: GObject.ParamSpec) => void;
            "notify::style": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-markup": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-text": (pspec: GObject.ParamSpec) => void;
            "notify::valign": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::visible": (pspec: GObject.ParamSpec) => void;
            "notify::width-request": (pspec: GObject.ParamSpec) => void;
            "notify::window": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Gtk.LevelBar.ConstructorProps {
            vertical: boolean;
        }
    }

    /**
     * @gir-type Class
     */
    class LevelBar extends Gtk.LevelBar {
        static $gtype: GObject.GType<LevelBar>;

        // Properties
        /**
         * Corresponds to [property@Gtk.Orientable :orientation].
         */
        get vertical(): boolean;
        set vertical(val: boolean);

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: LevelBar.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<LevelBar.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](): LevelBar;

        // Signals
        /** @signal */
        connect<K extends keyof LevelBar.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, LevelBar.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof LevelBar.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, LevelBar.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof LevelBar.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<LevelBar.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        get_vertical(): boolean;

        /**
         * @param value 
         */
        set_vertical(value: boolean): void;
    }


    namespace Overlay {
        // Signal signatures
        interface SignalSignatures extends Gtk.Overlay.SignalSignatures {
            "notify::pass-through": (pspec: GObject.ParamSpec) => void;
            "notify::overlay": (pspec: GObject.ParamSpec) => void;
            "notify::overlays": (pspec: GObject.ParamSpec) => void;
            "notify::child": (pspec: GObject.ParamSpec) => void;
            "notify::border-width": (pspec: GObject.ParamSpec) => void;
            "notify::resize-mode": (pspec: GObject.ParamSpec) => void;
            "notify::app-paintable": (pspec: GObject.ParamSpec) => void;
            "notify::can-default": (pspec: GObject.ParamSpec) => void;
            "notify::can-focus": (pspec: GObject.ParamSpec) => void;
            "notify::composite-child": (pspec: GObject.ParamSpec) => void;
            "notify::double-buffered": (pspec: GObject.ParamSpec) => void;
            "notify::events": (pspec: GObject.ParamSpec) => void;
            "notify::expand": (pspec: GObject.ParamSpec) => void;
            "notify::focus-on-click": (pspec: GObject.ParamSpec) => void;
            "notify::halign": (pspec: GObject.ParamSpec) => void;
            "notify::has-default": (pspec: GObject.ParamSpec) => void;
            "notify::has-focus": (pspec: GObject.ParamSpec) => void;
            "notify::has-tooltip": (pspec: GObject.ParamSpec) => void;
            "notify::height-request": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::is-focus": (pspec: GObject.ParamSpec) => void;
            "notify::margin": (pspec: GObject.ParamSpec) => void;
            "notify::margin-bottom": (pspec: GObject.ParamSpec) => void;
            "notify::margin-end": (pspec: GObject.ParamSpec) => void;
            "notify::margin-left": (pspec: GObject.ParamSpec) => void;
            "notify::margin-right": (pspec: GObject.ParamSpec) => void;
            "notify::margin-start": (pspec: GObject.ParamSpec) => void;
            "notify::margin-top": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::no-show-all": (pspec: GObject.ParamSpec) => void;
            "notify::opacity": (pspec: GObject.ParamSpec) => void;
            "notify::parent": (pspec: GObject.ParamSpec) => void;
            "notify::receives-default": (pspec: GObject.ParamSpec) => void;
            "notify::scale-factor": (pspec: GObject.ParamSpec) => void;
            "notify::sensitive": (pspec: GObject.ParamSpec) => void;
            "notify::style": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-markup": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-text": (pspec: GObject.ParamSpec) => void;
            "notify::valign": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::visible": (pspec: GObject.ParamSpec) => void;
            "notify::width-request": (pspec: GObject.ParamSpec) => void;
            "notify::window": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Gtk.Overlay.ConstructorProps {
            pass_through: boolean;
            passThrough: boolean;
            overlay: Gtk.Widget | null;
            overlays: Gtk.Widget[];
            child: Gtk.Widget | null | any;
        }
    }

    /**
     * @gir-type Class
     */
    class Overlay extends Gtk.Overlay {
        static $gtype: GObject.GType<Overlay>;

        // Properties
        get pass_through(): boolean;
        set pass_through(val: boolean);

        get passThrough(): boolean;
        set passThrough(val: boolean);

        /**
         * First {@link Astal.Overlay.overlays} element.
         * WARNING: setting this value will remove every overlay but the first.
         */
        get overlay(): Gtk.Widget | null;
        set overlay(val: Gtk.Widget | null);

        /**
         * Sets the overlays of this Overlay. {@link Gtk.Overlay.add_overlay}.
         */
        get overlays(): Gtk.Widget[];
        set overlays(val: Gtk.Widget[]);

    // This accessor conflicts with another accessor's type in a parent class or interface.
        get child(): Gtk.Widget | null | any;
    // This accessor conflicts with another accessor's type in a parent class or interface.
        set child(val: Gtk.Widget | null | any);

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Overlay.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Overlay.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](): Overlay;

        // Signals
        /** @signal */
        connect<K extends keyof Overlay.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Overlay.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Overlay.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Overlay.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Overlay.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Overlay.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        /**
         * @param widget 
         */
        add_overlay(widget: Gtk.Widget): void;

        get_pass_through(): boolean;

        /**
         * @param value 
         */
        set_pass_through(value: boolean): void;

        get_overlay(): Gtk.Widget | null;

        /**
         * @param value 
         */
        set_overlay(value: Gtk.Widget | null): void;

        get_overlays(): Gtk.Widget[];

        /**
         * @param value 
         */
        set_overlays(value: Gtk.Widget[]): void;

        get_child(): Gtk.Widget | null;

        /**
         * @param value 
         */
        set_child(value: Gtk.Widget | null): void;
    }


    namespace Scrollable {
        // Signal signatures
        interface SignalSignatures extends Gtk.ScrolledWindow.SignalSignatures {
            "notify::hscroll": (pspec: GObject.ParamSpec) => void;
            "notify::vscroll": (pspec: GObject.ParamSpec) => void;
            "notify::hadjustment": (pspec: GObject.ParamSpec) => void;
            "notify::hscrollbar-policy": (pspec: GObject.ParamSpec) => void;
            "notify::kinetic-scrolling": (pspec: GObject.ParamSpec) => void;
            "notify::max-content-height": (pspec: GObject.ParamSpec) => void;
            "notify::max-content-width": (pspec: GObject.ParamSpec) => void;
            "notify::min-content-height": (pspec: GObject.ParamSpec) => void;
            "notify::min-content-width": (pspec: GObject.ParamSpec) => void;
            "notify::overlay-scrolling": (pspec: GObject.ParamSpec) => void;
            "notify::propagate-natural-height": (pspec: GObject.ParamSpec) => void;
            "notify::propagate-natural-width": (pspec: GObject.ParamSpec) => void;
            "notify::shadow-type": (pspec: GObject.ParamSpec) => void;
            "notify::vadjustment": (pspec: GObject.ParamSpec) => void;
            "notify::vscrollbar-policy": (pspec: GObject.ParamSpec) => void;
            "notify::window-placement": (pspec: GObject.ParamSpec) => void;
            "notify::window-placement-set": (pspec: GObject.ParamSpec) => void;
            "notify::border-width": (pspec: GObject.ParamSpec) => void;
            "notify::child": (pspec: GObject.ParamSpec) => void;
            "notify::resize-mode": (pspec: GObject.ParamSpec) => void;
            "notify::app-paintable": (pspec: GObject.ParamSpec) => void;
            "notify::can-default": (pspec: GObject.ParamSpec) => void;
            "notify::can-focus": (pspec: GObject.ParamSpec) => void;
            "notify::composite-child": (pspec: GObject.ParamSpec) => void;
            "notify::double-buffered": (pspec: GObject.ParamSpec) => void;
            "notify::events": (pspec: GObject.ParamSpec) => void;
            "notify::expand": (pspec: GObject.ParamSpec) => void;
            "notify::focus-on-click": (pspec: GObject.ParamSpec) => void;
            "notify::halign": (pspec: GObject.ParamSpec) => void;
            "notify::has-default": (pspec: GObject.ParamSpec) => void;
            "notify::has-focus": (pspec: GObject.ParamSpec) => void;
            "notify::has-tooltip": (pspec: GObject.ParamSpec) => void;
            "notify::height-request": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::is-focus": (pspec: GObject.ParamSpec) => void;
            "notify::margin": (pspec: GObject.ParamSpec) => void;
            "notify::margin-bottom": (pspec: GObject.ParamSpec) => void;
            "notify::margin-end": (pspec: GObject.ParamSpec) => void;
            "notify::margin-left": (pspec: GObject.ParamSpec) => void;
            "notify::margin-right": (pspec: GObject.ParamSpec) => void;
            "notify::margin-start": (pspec: GObject.ParamSpec) => void;
            "notify::margin-top": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::no-show-all": (pspec: GObject.ParamSpec) => void;
            "notify::opacity": (pspec: GObject.ParamSpec) => void;
            "notify::parent": (pspec: GObject.ParamSpec) => void;
            "notify::receives-default": (pspec: GObject.ParamSpec) => void;
            "notify::scale-factor": (pspec: GObject.ParamSpec) => void;
            "notify::sensitive": (pspec: GObject.ParamSpec) => void;
            "notify::style": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-markup": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-text": (pspec: GObject.ParamSpec) => void;
            "notify::valign": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::visible": (pspec: GObject.ParamSpec) => void;
            "notify::width-request": (pspec: GObject.ParamSpec) => void;
            "notify::window": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Gtk.ScrolledWindow.ConstructorProps {
            hscroll: Gtk.PolicyType;
            vscroll: Gtk.PolicyType;
        }
    }

    /**
     * Subclass of {@link Gtk.ScrolledWindow} which has its policy default to {@link Gtk.PolicyType.AUTOMATIC}.
     * Its css selector is `scrollable`. Its child getter returns the child of the inner {@link Gtk.Viewport}, instead of the viewport.
     * @gir-type Class
     */
    class Scrollable extends Gtk.ScrolledWindow {
        static $gtype: GObject.GType<Scrollable>;

        // Properties
        get hscroll(): Gtk.PolicyType;
        set hscroll(val: Gtk.PolicyType);

        get vscroll(): Gtk.PolicyType;
        set vscroll(val: Gtk.PolicyType);

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Scrollable.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Scrollable.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](): Scrollable;

        // Signals
        /** @signal */
        connect<K extends keyof Scrollable.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Scrollable.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Scrollable.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Scrollable.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Scrollable.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Scrollable.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        get_child(): Gtk.Widget;

        /**
         * @param args 
         */
    // Conflicted with Gtk.Bin.get_child
        get_child(...args: never[]): any;

        get_hscroll(): Gtk.PolicyType;

        /**
         * @param value 
         */
        set_hscroll(value: Gtk.PolicyType): void;

        get_vscroll(): Gtk.PolicyType;

        /**
         * @param value 
         */
        set_vscroll(value: Gtk.PolicyType): void;
    }


    namespace Slider {
        // Signal signatures
        interface SignalSignatures extends Gtk.Scale.SignalSignatures {
            /**
             * Emitted when the user drags the slider or uses keyboard arrows and its value changes.
             * @signal
             */
            dragged: () => void;
            "notify::vertical": (pspec: GObject.ParamSpec) => void;
            "notify::dragging": (pspec: GObject.ParamSpec) => void;
            "notify::value": (pspec: GObject.ParamSpec) => void;
            "notify::min": (pspec: GObject.ParamSpec) => void;
            "notify::max": (pspec: GObject.ParamSpec) => void;
            "notify::step": (pspec: GObject.ParamSpec) => void;
            "notify::page": (pspec: GObject.ParamSpec) => void;
            "notify::digits": (pspec: GObject.ParamSpec) => void;
            "notify::draw-value": (pspec: GObject.ParamSpec) => void;
            "notify::has-origin": (pspec: GObject.ParamSpec) => void;
            "notify::value-pos": (pspec: GObject.ParamSpec) => void;
            "notify::adjustment": (pspec: GObject.ParamSpec) => void;
            "notify::fill-level": (pspec: GObject.ParamSpec) => void;
            "notify::inverted": (pspec: GObject.ParamSpec) => void;
            "notify::lower-stepper-sensitivity": (pspec: GObject.ParamSpec) => void;
            "notify::restrict-to-fill-level": (pspec: GObject.ParamSpec) => void;
            "notify::round-digits": (pspec: GObject.ParamSpec) => void;
            "notify::show-fill-level": (pspec: GObject.ParamSpec) => void;
            "notify::upper-stepper-sensitivity": (pspec: GObject.ParamSpec) => void;
            "notify::app-paintable": (pspec: GObject.ParamSpec) => void;
            "notify::can-default": (pspec: GObject.ParamSpec) => void;
            "notify::can-focus": (pspec: GObject.ParamSpec) => void;
            "notify::composite-child": (pspec: GObject.ParamSpec) => void;
            "notify::double-buffered": (pspec: GObject.ParamSpec) => void;
            "notify::events": (pspec: GObject.ParamSpec) => void;
            "notify::expand": (pspec: GObject.ParamSpec) => void;
            "notify::focus-on-click": (pspec: GObject.ParamSpec) => void;
            "notify::halign": (pspec: GObject.ParamSpec) => void;
            "notify::has-default": (pspec: GObject.ParamSpec) => void;
            "notify::has-focus": (pspec: GObject.ParamSpec) => void;
            "notify::has-tooltip": (pspec: GObject.ParamSpec) => void;
            "notify::height-request": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::is-focus": (pspec: GObject.ParamSpec) => void;
            "notify::margin": (pspec: GObject.ParamSpec) => void;
            "notify::margin-bottom": (pspec: GObject.ParamSpec) => void;
            "notify::margin-end": (pspec: GObject.ParamSpec) => void;
            "notify::margin-left": (pspec: GObject.ParamSpec) => void;
            "notify::margin-right": (pspec: GObject.ParamSpec) => void;
            "notify::margin-start": (pspec: GObject.ParamSpec) => void;
            "notify::margin-top": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::no-show-all": (pspec: GObject.ParamSpec) => void;
            "notify::opacity": (pspec: GObject.ParamSpec) => void;
            "notify::parent": (pspec: GObject.ParamSpec) => void;
            "notify::receives-default": (pspec: GObject.ParamSpec) => void;
            "notify::scale-factor": (pspec: GObject.ParamSpec) => void;
            "notify::sensitive": (pspec: GObject.ParamSpec) => void;
            "notify::style": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-markup": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-text": (pspec: GObject.ParamSpec) => void;
            "notify::valign": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::visible": (pspec: GObject.ParamSpec) => void;
            "notify::width-request": (pspec: GObject.ParamSpec) => void;
            "notify::window": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Gtk.Scale.ConstructorProps {
            vertical: boolean;
            dragging: boolean;
            value: number;
            min: number;
            max: number;
            step: number;
            page: number;
        }
    }

    /**
     * Subclass of {@link Gtk.Scale} which adds a signal and property for the drag state.
     * @gir-type Class
     */
    class Slider extends Gtk.Scale {
        static $gtype: GObject.GType<Slider>;

        // Properties
        /**
         * Corresponds to [property@Gtk.Orientable :orientation].
         */
        get vertical(): boolean;
        set vertical(val: boolean);

        /**
         * `true` when the user drags the slider or uses keyboard arrows.
         */
        get dragging(): boolean;
        set dragging(val: boolean);

        /**
         * Value of this slider. Defaults to `0`.
         */
        get value(): number;
        set value(val: number);

        /**
         * Minimum possible value of this slider. Defaults to `0`.
         */
        get min(): number;
        set min(val: number);

        /**
         * Maximum possible value of this slider. Defaults to `1`.
         */
        get max(): number;
        set max(val: number);

        /**
         * Size of step increments. Defaults to `0.05`.
         */
        get step(): number;
        set step(val: number);

        /**
         * Size of page increments. Defaults to `0.01`.
         */
        get page(): number;
        set page(val: number);

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Slider.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Slider.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](): Slider;

        // Signals
        /** @signal */
        connect<K extends keyof Slider.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Slider.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Slider.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Slider.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Slider.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Slider.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        get_vertical(): boolean;

        /**
         * @param value 
         */
        set_vertical(value: boolean): void;

        get_dragging(): boolean;

        get_value(): number;

        /**
         * @param value 
         */
        set_value(value: number): void;

        get_min(): number;

        /**
         * @param value 
         */
        set_min(value: number): void;

        get_max(): number;

        /**
         * @param value 
         */
        set_max(value: number): void;

        get_step(): number;

        /**
         * @param value 
         */
        set_step(value: number): void;

        get_page(): number;

        /**
         * @param value 
         */
        set_page(value: number): void;
    }


    namespace Stack {
        // Signal signatures
        interface SignalSignatures extends Gtk.Stack.SignalSignatures {
            "notify::shown": (pspec: GObject.ParamSpec) => void;
            "notify::children": (pspec: GObject.ParamSpec) => void;
            "notify::hhomogeneous": (pspec: GObject.ParamSpec) => void;
            "notify::homogeneous": (pspec: GObject.ParamSpec) => void;
            "notify::interpolate-size": (pspec: GObject.ParamSpec) => void;
            "notify::transition-duration": (pspec: GObject.ParamSpec) => void;
            "notify::transition-running": (pspec: GObject.ParamSpec) => void;
            "notify::transition-type": (pspec: GObject.ParamSpec) => void;
            "notify::vhomogeneous": (pspec: GObject.ParamSpec) => void;
            "notify::visible-child": (pspec: GObject.ParamSpec) => void;
            "notify::visible-child-name": (pspec: GObject.ParamSpec) => void;
            "notify::border-width": (pspec: GObject.ParamSpec) => void;
            "notify::child": (pspec: GObject.ParamSpec) => void;
            "notify::resize-mode": (pspec: GObject.ParamSpec) => void;
            "notify::app-paintable": (pspec: GObject.ParamSpec) => void;
            "notify::can-default": (pspec: GObject.ParamSpec) => void;
            "notify::can-focus": (pspec: GObject.ParamSpec) => void;
            "notify::composite-child": (pspec: GObject.ParamSpec) => void;
            "notify::double-buffered": (pspec: GObject.ParamSpec) => void;
            "notify::events": (pspec: GObject.ParamSpec) => void;
            "notify::expand": (pspec: GObject.ParamSpec) => void;
            "notify::focus-on-click": (pspec: GObject.ParamSpec) => void;
            "notify::halign": (pspec: GObject.ParamSpec) => void;
            "notify::has-default": (pspec: GObject.ParamSpec) => void;
            "notify::has-focus": (pspec: GObject.ParamSpec) => void;
            "notify::has-tooltip": (pspec: GObject.ParamSpec) => void;
            "notify::height-request": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::is-focus": (pspec: GObject.ParamSpec) => void;
            "notify::margin": (pspec: GObject.ParamSpec) => void;
            "notify::margin-bottom": (pspec: GObject.ParamSpec) => void;
            "notify::margin-end": (pspec: GObject.ParamSpec) => void;
            "notify::margin-left": (pspec: GObject.ParamSpec) => void;
            "notify::margin-right": (pspec: GObject.ParamSpec) => void;
            "notify::margin-start": (pspec: GObject.ParamSpec) => void;
            "notify::margin-top": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::no-show-all": (pspec: GObject.ParamSpec) => void;
            "notify::opacity": (pspec: GObject.ParamSpec) => void;
            "notify::parent": (pspec: GObject.ParamSpec) => void;
            "notify::receives-default": (pspec: GObject.ParamSpec) => void;
            "notify::scale-factor": (pspec: GObject.ParamSpec) => void;
            "notify::sensitive": (pspec: GObject.ParamSpec) => void;
            "notify::style": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-markup": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-text": (pspec: GObject.ParamSpec) => void;
            "notify::valign": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::visible": (pspec: GObject.ParamSpec) => void;
            "notify::width-request": (pspec: GObject.ParamSpec) => void;
            "notify::window": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Gtk.Stack.ConstructorProps {
            shown: string;
            children: Gtk.Widget[];
        }
    }

    /**
     * Subclass of {@link Gtk.Stack} that has a children setter which invokes {@link Gt.Stack.add_named} with the child's [property
     * `Gtk`.Widget:name] property.
     * @gir-type Class
     */
    class Stack extends Gtk.Stack {
        static $gtype: GObject.GType<Stack>;

        // Properties
        /**
         * Same as {@link Gtk.Stack.visible_child_name}.
         */
        get shown(): string;
        set shown(val: string);

        get children(): Gtk.Widget[];
        set children(val: Gtk.Widget[]);

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Stack.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Stack.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](): Stack;

        // Signals
        /** @signal */
        connect<K extends keyof Stack.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Stack.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Stack.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Stack.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Stack.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Stack.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        get_shown(): string;

        /**
         * @param value 
         */
        set_shown(value: string): void;

        get_children(): Gtk.Widget[];

        /**
         * @param value 
         */
        set_children(value: Gtk.Widget[]): void;
    }


    namespace Window {
        // Signal signatures
        interface SignalSignatures extends Gtk.Window.SignalSignatures {
            "notify::inhibit": (pspec: GObject.ParamSpec) => void;
            "notify::namespace": (pspec: GObject.ParamSpec) => void;
            "notify::anchor": (pspec: GObject.ParamSpec) => void;
            "notify::exclusivity": (pspec: GObject.ParamSpec) => void;
            "notify::layer": (pspec: GObject.ParamSpec) => void;
            "notify::keymode": (pspec: GObject.ParamSpec) => void;
            "notify::gdkmonitor": (pspec: GObject.ParamSpec) => void;
            "notify::margin-top": (pspec: GObject.ParamSpec) => void;
            "notify::margin-bottom": (pspec: GObject.ParamSpec) => void;
            "notify::margin-left": (pspec: GObject.ParamSpec) => void;
            "notify::margin-right": (pspec: GObject.ParamSpec) => void;
            "notify::margin": (pspec: GObject.ParamSpec) => void;
            "notify::monitor": (pspec: GObject.ParamSpec) => void;
            "notify::accept-focus": (pspec: GObject.ParamSpec) => void;
            "notify::application": (pspec: GObject.ParamSpec) => void;
            "notify::attached-to": (pspec: GObject.ParamSpec) => void;
            "notify::decorated": (pspec: GObject.ParamSpec) => void;
            "notify::default-height": (pspec: GObject.ParamSpec) => void;
            "notify::default-width": (pspec: GObject.ParamSpec) => void;
            "notify::deletable": (pspec: GObject.ParamSpec) => void;
            "notify::destroy-with-parent": (pspec: GObject.ParamSpec) => void;
            "notify::focus-on-map": (pspec: GObject.ParamSpec) => void;
            "notify::focus-visible": (pspec: GObject.ParamSpec) => void;
            "notify::gravity": (pspec: GObject.ParamSpec) => void;
            "notify::has-resize-grip": (pspec: GObject.ParamSpec) => void;
            "notify::has-toplevel-focus": (pspec: GObject.ParamSpec) => void;
            "notify::hide-titlebar-when-maximized": (pspec: GObject.ParamSpec) => void;
            "notify::icon": (pspec: GObject.ParamSpec) => void;
            "notify::icon-name": (pspec: GObject.ParamSpec) => void;
            "notify::is-active": (pspec: GObject.ParamSpec) => void;
            "notify::is-maximized": (pspec: GObject.ParamSpec) => void;
            "notify::mnemonics-visible": (pspec: GObject.ParamSpec) => void;
            "notify::modal": (pspec: GObject.ParamSpec) => void;
            "notify::resizable": (pspec: GObject.ParamSpec) => void;
            "notify::resize-grip-visible": (pspec: GObject.ParamSpec) => void;
            "notify::role": (pspec: GObject.ParamSpec) => void;
            "notify::screen": (pspec: GObject.ParamSpec) => void;
            "notify::skip-pager-hint": (pspec: GObject.ParamSpec) => void;
            "notify::skip-taskbar-hint": (pspec: GObject.ParamSpec) => void;
            "notify::startup-id": (pspec: GObject.ParamSpec) => void;
            "notify::title": (pspec: GObject.ParamSpec) => void;
            "notify::transient-for": (pspec: GObject.ParamSpec) => void;
            "notify::type": (pspec: GObject.ParamSpec) => void;
            "notify::type-hint": (pspec: GObject.ParamSpec) => void;
            "notify::urgency-hint": (pspec: GObject.ParamSpec) => void;
            "notify::window-position": (pspec: GObject.ParamSpec) => void;
            "notify::border-width": (pspec: GObject.ParamSpec) => void;
            "notify::child": (pspec: GObject.ParamSpec) => void;
            "notify::resize-mode": (pspec: GObject.ParamSpec) => void;
            "notify::app-paintable": (pspec: GObject.ParamSpec) => void;
            "notify::can-default": (pspec: GObject.ParamSpec) => void;
            "notify::can-focus": (pspec: GObject.ParamSpec) => void;
            "notify::composite-child": (pspec: GObject.ParamSpec) => void;
            "notify::double-buffered": (pspec: GObject.ParamSpec) => void;
            "notify::events": (pspec: GObject.ParamSpec) => void;
            "notify::expand": (pspec: GObject.ParamSpec) => void;
            "notify::focus-on-click": (pspec: GObject.ParamSpec) => void;
            "notify::halign": (pspec: GObject.ParamSpec) => void;
            "notify::has-default": (pspec: GObject.ParamSpec) => void;
            "notify::has-focus": (pspec: GObject.ParamSpec) => void;
            "notify::has-tooltip": (pspec: GObject.ParamSpec) => void;
            "notify::height-request": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::is-focus": (pspec: GObject.ParamSpec) => void;
            "notify::margin-end": (pspec: GObject.ParamSpec) => void;
            "notify::margin-start": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::no-show-all": (pspec: GObject.ParamSpec) => void;
            "notify::opacity": (pspec: GObject.ParamSpec) => void;
            "notify::parent": (pspec: GObject.ParamSpec) => void;
            "notify::receives-default": (pspec: GObject.ParamSpec) => void;
            "notify::scale-factor": (pspec: GObject.ParamSpec) => void;
            "notify::sensitive": (pspec: GObject.ParamSpec) => void;
            "notify::style": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-markup": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-text": (pspec: GObject.ParamSpec) => void;
            "notify::valign": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::visible": (pspec: GObject.ParamSpec) => void;
            "notify::width-request": (pspec: GObject.ParamSpec) => void;
            "notify::window": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Gtk.Window.ConstructorProps {
            inhibit: boolean;
            namespace: string;
            anchor: WindowAnchor;
            exclusivity: Exclusivity;
            layer: Layer;
            keymode: Keymode;
            gdkmonitor: Gdk.Monitor;
            margin_top: number;
            marginTop: number;
            margin_bottom: number;
            marginBottom: number;
            margin_left: number;
            marginLeft: number;
            margin_right: number;
            marginRight: number;
            margin: number;
            monitor: number;
        }
    }

    /**
     * Subclass of {@link Gtk.Window} which integrates GtkLayerShell as class fields.
     * @gir-type Class
     */
    class Window extends Gtk.Window {
        static $gtype: GObject.GType<Window>;

        // Properties
        /**
         * When `true` it will permit inhibiting the idle behavior such as screen blanking, locking, and screensaving.
         */
        get inhibit(): boolean;
        set inhibit(val: boolean);

        /**
         * Namespace of this window. This can be used to target the layer in compositor rules.
         */
        get namespace(): string;
        set namespace(val: string);

        /**
         * Edges to anchor the window to.
         * If two perpendicular edges are anchored, the surface will be anchored to that corner. If two opposite edges are anchored, the window will be 
         * stretched across the screen in that direction.
         */
        get anchor(): WindowAnchor;
        set anchor(val: WindowAnchor);

        /**
         * Exclusivity of this window.
         */
        get exclusivity(): Exclusivity;
        set exclusivity(val: Exclusivity);

        /**
         * Which layer to appear this window on.
         */
        get layer(): Layer;
        set layer(val: Layer);

        /**
         * Keyboard mode of this window.
         */
        get keymode(): Keymode;
        set keymode(val: Keymode);

        /**
         * Which monitor to appear this window on.
         */
        get gdkmonitor(): Gdk.Monitor;
        set gdkmonitor(val: Gdk.Monitor);

        get margin_top(): number;
        set margin_top(val: number);

        get marginTop(): number;
        set marginTop(val: number);

        get margin_bottom(): number;
        set margin_bottom(val: number);

        get marginBottom(): number;
        set marginBottom(val: number);

        get margin_left(): number;
        set margin_left(val: number);

        get marginLeft(): number;
        set marginLeft(val: number);

        get margin_right(): number;
        set margin_right(val: number);

        get marginRight(): number;
        set marginRight(val: number);

        /**
         * @write-only
         */
        set margin(val: number);

        /**
         * Which monitor to appear this window on.
         * CAUTION: the id might not be the same mapped by the compositor.
         */
        get monitor(): number;
        set monitor(val: number);

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Window.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Window.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](): Window;

        // Signals
        /** @signal */
        connect<K extends keyof Window.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Window.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Window.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Window.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Window.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Window.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        /**
         * Get the current {@link Gdk.Monitor} this window resides in.
         */
        get_current_monitor(): Gdk.Monitor;

        get_inhibit(): boolean;

        /**
         * @param value 
         */
        set_inhibit(value: boolean): void;

        get_namespace(): string;

        /**
         * @param value 
         */
        set_namespace(value: string): void;

        get_anchor(): WindowAnchor;

        /**
         * @param value 
         */
        set_anchor(value: WindowAnchor): void;

        get_exclusivity(): Exclusivity;

        /**
         * @param value 
         */
        set_exclusivity(value: Exclusivity): void;

        get_layer(): Layer;

        /**
         * @param value 
         */
        set_layer(value: Layer): void;

        get_keymode(): Keymode;

        /**
         * @param value 
         */
        set_keymode(value: Keymode): void;

        get_gdkmonitor(): Gdk.Monitor;

        /**
         * @param value 
         */
        set_gdkmonitor(value: Gdk.Monitor): void;

        get_margin_top(): number;

        /**
         * @param value 
         */
        set_margin_top(value: number): void;

        get_margin_bottom(): number;

        /**
         * @param value 
         */
        set_margin_bottom(value: number): void;

        get_margin_left(): number;

        /**
         * @param value 
         */
        set_margin_left(value: number): void;

        get_margin_right(): number;

        /**
         * @param value 
         */
        set_margin_right(value: number): void;

        /**
         * @param value 
         */
        set_margin(value: number): void;

        get_monitor(): number;

        /**
         * @param value 
         */
        set_monitor(value: number): void;
    }


    namespace Application {
        // Signal signatures
        interface SignalSignatures extends Gtk.Application.SignalSignatures {
            /**
             * Emitted when a new monitor is added to {@link Gdk.Display}.
             * @signal
             */
            "monitor-added": (arg0: Gdk.Monitor) => void;
            /**
             * Emitted when a monitor is disconnected from {@link Gdk.Display}.
             * @signal
             */
            "monitor-removed": (arg0: Gdk.Monitor) => void;
            /**
             * Emitted when a window that has been added using {@link Gtk.Application.add_window} changes its visibility .
             * @signal
             */
            "window-toggled": (arg0: Gtk.Window) => void;
            "notify::monitors": (pspec: GObject.ParamSpec) => void;
            "notify::windows": (pspec: GObject.ParamSpec) => void;
            "notify::gtk-theme": (pspec: GObject.ParamSpec) => void;
            "notify::icon-theme": (pspec: GObject.ParamSpec) => void;
            "notify::cursor-theme": (pspec: GObject.ParamSpec) => void;
            "notify::active-window": (pspec: GObject.ParamSpec) => void;
            "notify::app-menu": (pspec: GObject.ParamSpec) => void;
            "notify::menubar": (pspec: GObject.ParamSpec) => void;
            "notify::register-session": (pspec: GObject.ParamSpec) => void;
            "notify::screensaver-active": (pspec: GObject.ParamSpec) => void;
            "notify::action-group": (pspec: GObject.ParamSpec) => void;
            "notify::application-id": (pspec: GObject.ParamSpec) => void;
            "notify::flags": (pspec: GObject.ParamSpec) => void;
            "notify::inactivity-timeout": (pspec: GObject.ParamSpec) => void;
            "notify::is-busy": (pspec: GObject.ParamSpec) => void;
            "notify::is-registered": (pspec: GObject.ParamSpec) => void;
            "notify::is-remote": (pspec: GObject.ParamSpec) => void;
            "notify::resource-base-path": (pspec: GObject.ParamSpec) => void;
            "notify::version": (pspec: GObject.ParamSpec) => void;
            "notify::instance-name": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Gtk.Application.ConstructorProps, AstalIO.Application.ConstructorProps {
            monitors: Gdk.Monitor[];
            windows: Gtk.Window[];
            gtk_theme: string;
            gtkTheme: string;
            icon_theme: string;
            iconTheme: string;
            cursor_theme: string;
            cursorTheme: string;
        }
    }

    /**
     * @gir-type Class
     * @deprecated
     */
    class Application extends Gtk.Application implements AstalIO.Application {
        static $gtype: GObject.GType<Application>;

        // Properties
        /**
         * Get all monitors from {@link Gdk.Display}.
         * @read-only
         */
        get monitors(): Gdk.Monitor[];

        /**
         * Windows that has been added to this app using {@link Gtk.Application.add_window}.
         * @read-only
         */
        get windows(): Gtk.Window[];

        /**
         * Shortcut for {@link Gtk.Settings.gtk_theme_name}
         */
        get gtk_theme(): string;
        set gtk_theme(val: string);

        /**
         * Shortcut for {@link Gtk.Settings.gtk_theme_name}
         */
        get gtkTheme(): string;
        set gtkTheme(val: string);

        /**
         * Shortcut for {@link Gtk.Settings.gtk_icon_theme_name}
         */
        get icon_theme(): string;
        set icon_theme(val: string);

        /**
         * Shortcut for {@link Gtk.Settings.gtk_icon_theme_name}
         */
        get iconTheme(): string;
        set iconTheme(val: string);

        /**
         * Shortcut for {@link Gtk.Settings.gtk_cursor_theme_name}
         */
        get cursor_theme(): string;
        set cursor_theme(val: string);

        /**
         * Shortcut for {@link Gtk.Settings.gtk_cursor_theme_name}
         */
        get cursorTheme(): string;
        set cursorTheme(val: string);

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Application.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Application.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](): Application;

        // Signals
        /** @signal */
        connect<K extends keyof Application.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Application.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Application.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Application.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Application.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Application.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Virtual methods
        /**
         * Handler for an incoming request.
         * @param request Body of the request
         * @param conn The connection which expects the response.
         * @virtual
         */
        vfunc_request(request: string, conn: Gio.SocketConnection): void;

        // Methods
        /**
         * Remove all {@link Gtk.StyleContext} providers.
         */
        reset_css(): void;

        /**
         * Get a window by its {@link Gtk.Widget.name} that has been added to this app using {@link Gtk.Application.add_window}.
         * @param name 
         */
        get_window(name: string): Gtk.Window | null;

        /**
         * Add a new {@link Gtk.StyleContext} provider.
         * @param style Css string or a path to a css file.
         * @param reset 
         */
        apply_css(style: string, reset: boolean): void;

        /**
         * Shortcut for {@link Gtk.IconTheme.prepend_search_path}.
         * @param path 
         */
        add_icons(path: string | null): void;

        /**
         * Handler for an incoming request.
         * @param request Body of the request
         * @param conn The connection which expects the response.
         */
        request(request: string, conn: Gio.SocketConnection): void;

        get_monitors(): Gdk.Monitor[];

        get_windows(): Gtk.Window[];

        get_gtk_theme(): string;

        /**
         * @param value 
         */
        set_gtk_theme(value: string): void;

        get_icon_theme(): string;

        /**
         * @param value 
         */
        set_icon_theme(value: string): void;

        get_cursor_theme(): string;

        /**
         * @param value 
         */
        set_cursor_theme(value: string): void;

        /** @category Inherited from AstalIO.Application */
        get instance_name(): string;
        set instance_name(val: string);

        /** @category Inherited from AstalIO.Application */
        get instanceName(): string;
        set instanceName(val: string);

        quit(): void;

        inspector(): void;

        /**
         * @param window 
         */
        toggle_window(window: string): void;

        acquire_socket(): void;

        get_instance_name(): string;

        /**
         * @param value 
         */
        set_instance_name(value: string): void;

        /**
         * @virtual
         */
        vfunc_quit(): void;

        /**
         * @virtual
         */
        vfunc_inspector(): void;

        /**
         * @param window 
         * @virtual
         */
        vfunc_toggle_window(window: string): void;

        /**
         * @virtual
         */
        vfunc_acquire_socket(): void;

        /**
         * @virtual
         */
        vfunc_get_instance_name(): string;

        /**
         * @param value 
         * @virtual
         */
        vfunc_set_instance_name(value: string): void;
    }


    /**
     * @gir-type Alias
     */
    type BoxClass = typeof Box;

    /**
     * @gir-type Struct
     */
    abstract class BoxPrivate {
        static $gtype: GObject.GType<BoxPrivate>;
    }


    /**
     * @gir-type Alias
     */
    type ButtonClass = typeof Button;

    /**
     * @gir-type Struct
     */
    abstract class ButtonPrivate {
        static $gtype: GObject.GType<ButtonPrivate>;
    }


    /**
     * @gir-type Alias
     */
    type CenterBoxClass = typeof CenterBox;

    /**
     * @gir-type Struct
     */
    abstract class CenterBoxPrivate {
        static $gtype: GObject.GType<CenterBoxPrivate>;
    }


    /**
     * @gir-type Alias
     */
    type CircularProgressClass = typeof CircularProgress;

    /**
     * @gir-type Struct
     */
    abstract class CircularProgressPrivate {
        static $gtype: GObject.GType<CircularProgressPrivate>;
    }


    /**
     * @gir-type Alias
     */
    type EventBoxClass = typeof EventBox;

    /**
     * @gir-type Struct
     */
    abstract class EventBoxPrivate {
        static $gtype: GObject.GType<EventBoxPrivate>;
    }


    /**
     * @gir-type Alias
     */
    type IconClass = typeof Icon;

    /**
     * @gir-type Struct
     */
    abstract class IconPrivate {
        static $gtype: GObject.GType<IconPrivate>;
    }


    /**
     * @gir-type Alias
     */
    type LabelClass = typeof Label;

    /**
     * @gir-type Struct
     */
    abstract class LabelPrivate {
        static $gtype: GObject.GType<LabelPrivate>;
    }


    /**
     * @gir-type Alias
     */
    type LevelBarClass = typeof LevelBar;

    /**
     * @gir-type Struct
     */
    abstract class LevelBarPrivate {
        static $gtype: GObject.GType<LevelBarPrivate>;
    }


    /**
     * @gir-type Alias
     */
    type OverlayClass = typeof Overlay;

    /**
     * @gir-type Struct
     */
    abstract class OverlayPrivate {
        static $gtype: GObject.GType<OverlayPrivate>;
    }


    /**
     * @gir-type Alias
     */
    type ScrollableClass = typeof Scrollable;

    /**
     * @gir-type Struct
     */
    abstract class ScrollablePrivate {
        static $gtype: GObject.GType<ScrollablePrivate>;
    }


    /**
     * @gir-type Alias
     */
    type SliderClass = typeof Slider;

    /**
     * @gir-type Struct
     */
    abstract class SliderPrivate {
        static $gtype: GObject.GType<SliderPrivate>;
    }


    /**
     * @gir-type Alias
     */
    type StackClass = typeof Stack;

    /**
     * @gir-type Struct
     */
    abstract class StackPrivate {
        static $gtype: GObject.GType<StackPrivate>;
    }


    /**
     * @gir-type Alias
     */
    type WindowClass = typeof Window;

    /**
     * @gir-type Struct
     */
    abstract class WindowPrivate {
        static $gtype: GObject.GType<WindowPrivate>;
    }


    /**
     * @gir-type Alias
     */
    type ApplicationClass = typeof Application;

    /**
     * @gir-type Struct
     */
    abstract class ApplicationPrivate {
        static $gtype: GObject.GType<ApplicationPrivate>;
    }


    /**
     * Struct for {@link Gdk.EventButton}
     * @gir-type Struct
     */
    class ClickEvent {
        static $gtype: GObject.GType<ClickEvent>;

        // Fields
        release: boolean;

        time: number;

        x: number;

        y: number;

        modifier: Gdk.ModifierType;

        button: MouseButton;

        // Methods
        /**
         * @param event 
         */
        init(event: Gdk.EventButton): void;
    }


    /**
     * Struct for {@link Gdk.EventCrossing}
     * @gir-type Struct
     */
    class HoverEvent {
        static $gtype: GObject.GType<HoverEvent>;

        // Fields
        lost: boolean;

        time: number;

        x: number;

        y: number;

        modifier: Gdk.ModifierType;

        mode: Gdk.CrossingMode;

        detail: Gdk.NotifyType;

        // Methods
        /**
         * @param event 
         */
        init(event: Gdk.EventCrossing): void;
    }


    /**
     * Struct for {@link Gdk.EventScroll}
     * @gir-type Struct
     */
    class ScrollEvent {
        static $gtype: GObject.GType<ScrollEvent>;

        // Fields
        time: number;

        x: number;

        y: number;

        modifier: Gdk.ModifierType;

        direction: Gdk.ScrollDirection;

        delta_x: number;

        delta_y: number;

        // Methods
        /**
         * @param event 
         */
        init(event: Gdk.EventScroll): void;
    }


    /**
     * Struct for {@link Gdk.EventMotion}
     * @gir-type Struct
     */
    class MotionEvent {
        static $gtype: GObject.GType<MotionEvent>;

        // Fields
        time: number;

        x: number;

        y: number;

        modifier: Gdk.ModifierType;

        // Methods
        /**
         * @param event 
         */
        init(event: Gdk.EventMotion): void;
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

export default Astal;

}

declare module 'gi://Astal' {
    import Astal30 from 'gi://Astal?version=3.0';
    export default Astal30;
}
// END
