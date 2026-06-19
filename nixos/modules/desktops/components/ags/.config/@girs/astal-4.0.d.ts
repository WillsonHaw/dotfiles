/// <reference path="./gio-2.0.d.ts" />
/// <reference path="./gobject-2.0.d.ts" />
/// <reference path="./glib-2.0.d.ts" />
/// <reference path="./gmodule-2.0.d.ts" />
/// <reference path="./astalio-0.1.d.ts" />
/// <reference path="./gdk-4.0.d.ts" />
/// <reference path="./cairo-1.0.d.ts" />
/// <reference path="./cairo.d.ts" />
/// <reference path="./pangocairo-1.0.d.ts" />
/// <reference path="./pango-1.0.d.ts" />
/// <reference path="./harfbuzz-0.0.d.ts" />
/// <reference path="./freetype2-2.0.d.ts" />
/// <reference path="./gdkpixbuf-2.0.d.ts" />
/// <reference path="./gtk-4.0.d.ts" />
/// <reference path="./gsk-4.0.d.ts" />
/// <reference path="./graphene-1.0.d.ts" />

/**
 * Type Definitions for Gjs (https://gjs.guide/)
 *
 * These type definitions are automatically generated, do not edit them by hand.
 * If you found a bug fix it in `ts-for-gir` or create a bug report on https://github.com/gjsify/ts-for-gir
 *
 * The based EJS template file is used for the generated .d.ts file of each GIR module like Gtk-4.0, GObject-2.0, ...
 */

declare module 'gi://Astal?version=4.0' {

// Module dependencies
import type Gio from 'gi://Gio?version=2.0';
import type GObject from 'gi://GObject?version=2.0';
import type GLib from 'gi://GLib?version=2.0';
import type GModule from 'gi://GModule?version=2.0';
import type AstalIO from 'gi://AstalIO?version=0.1';
import type Gdk from 'gi://Gdk?version=4.0';
import type cairo from 'cairo';
import type PangoCairo from 'gi://PangoCairo?version=1.0';
import type Pango from 'gi://Pango?version=1.0';
import type HarfBuzz from 'gi://HarfBuzz?version=0.0';
import type freetype2 from 'gi://freetype2?version=2.0';
import type GdkPixbuf from 'gi://GdkPixbuf?version=2.0';
import type Gtk from 'gi://Gtk?version=4.0';
import type Gsk from 'gi://Gsk?version=4.0';
import type Graphene from 'gi://Graphene?version=1.0';

export namespace Astal {

    /**
     * Astal-4.0
     */


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


    namespace Bin {
        // Signal signatures
        interface SignalSignatures extends Gtk.Widget.SignalSignatures {
            "notify::child": (pspec: GObject.ParamSpec) => void;
            "notify::can-focus": (pspec: GObject.ParamSpec) => void;
            "notify::can-target": (pspec: GObject.ParamSpec) => void;
            "notify::css-classes": (pspec: GObject.ParamSpec) => void;
            "notify::css-name": (pspec: GObject.ParamSpec) => void;
            "notify::cursor": (pspec: GObject.ParamSpec) => void;
            "notify::focus-on-click": (pspec: GObject.ParamSpec) => void;
            "notify::focusable": (pspec: GObject.ParamSpec) => void;
            "notify::halign": (pspec: GObject.ParamSpec) => void;
            "notify::has-default": (pspec: GObject.ParamSpec) => void;
            "notify::has-focus": (pspec: GObject.ParamSpec) => void;
            "notify::has-tooltip": (pspec: GObject.ParamSpec) => void;
            "notify::height-request": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::layout-manager": (pspec: GObject.ParamSpec) => void;
            "notify::limit-events": (pspec: GObject.ParamSpec) => void;
            "notify::margin-bottom": (pspec: GObject.ParamSpec) => void;
            "notify::margin-end": (pspec: GObject.ParamSpec) => void;
            "notify::margin-start": (pspec: GObject.ParamSpec) => void;
            "notify::margin-top": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::opacity": (pspec: GObject.ParamSpec) => void;
            "notify::overflow": (pspec: GObject.ParamSpec) => void;
            "notify::parent": (pspec: GObject.ParamSpec) => void;
            "notify::receives-default": (pspec: GObject.ParamSpec) => void;
            "notify::root": (pspec: GObject.ParamSpec) => void;
            "notify::scale-factor": (pspec: GObject.ParamSpec) => void;
            "notify::sensitive": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-markup": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-text": (pspec: GObject.ParamSpec) => void;
            "notify::valign": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::visible": (pspec: GObject.ParamSpec) => void;
            "notify::width-request": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Gtk.Widget.ConstructorProps, Gtk.Buildable.ConstructorProps {
            child: Gtk.Widget | null;
        }
    }

    /**
     * A widget with one child. It is useful for deriving subclasses, since it provides common code needed for handling a single child widget.
     * @gir-type Class
     */
    class Bin extends Gtk.Widget implements Gtk.Buildable {
        static $gtype: GObject.GType<Bin>;

        // Properties
        get child(): Gtk.Widget | null;
        set child(val: Gtk.Widget | null);

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Bin.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Bin.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](): Bin;

        // Signals
        /** @signal */
        connect<K extends keyof Bin.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Bin.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Bin.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Bin.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Bin.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Bin.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        get_child(): Gtk.Widget | null;

        /**
         * @param value 
         */
        set_child(value: Gtk.Widget | null): void;

        /**
         * Gets the ID of the `buildable` object.
         * 
         * {@link Gtk.Builder} sets the name based on the ID attribute
         * of the `<object>` tag used to construct the `buildable`.
         * @returns the ID of the buildable object
         */
        get_buildable_id(): string | null;

        /**
         * Adds a child to `buildable`. `type` is an optional string
         * describing how the child should be added.
         * @param builder a {@link Gtk.Builder}
         * @param child child to add
         * @param type kind of child or `null`
         * @virtual
         */
        vfunc_add_child(builder: Gtk.Builder, child: GObject.Object, type: string | null): void;

        /**
         * Similar to `gtk_buildable_parser_finished()` but is
         * called once for each custom tag handled by the `buildable`.
         * @param builder a {@link Gtk.Builder}
         * @param child child object or `null` for non-child tags
         * @param tagname the name of the tag
         * @param data user data created in custom_tag_start
         * @virtual
         */
        vfunc_custom_finished(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data: null): void;

        /**
         * Called at the end of each custom element handled by
         * the buildable.
         * @param builder {@link Gtk.Builder} used to construct this object
         * @param child child object or `null` for non-child tags
         * @param tagname name of tag
         * @param data user data that will be passed in to parser functions
         * @virtual
         */
        vfunc_custom_tag_end(builder: Gtk.Builder, child: GObject.Object | null, tagname: string, data: null): void;

        /**
         * Called for each unknown element under `<child>`.
         * @param builder a {@link Gtk.Builder} used to construct this object
         * @param child child object or `null` for non-child tags
         * @param tagname name of tag
         * @virtual
         */
        vfunc_custom_tag_start(builder: Gtk.Builder, child: GObject.Object | null, tagname: string): [boolean, Gtk.BuildableParser, never];

        /**
         * The getter corresponding to `set_id`. Implement this
         *   if you implement `set_id`.
         * @virtual
         */
        vfunc_get_id(): string;

        /**
         * Retrieves the internal child called `childname` of the `buildable` object.
         * @param builder a {@link Gtk.Builder}
         * @param childname name of child
         * @virtual
         */
        vfunc_get_internal_child<T = GObject.Object>(builder: Gtk.Builder, childname: string): T;

        /**
         * Called when a builder finishes the parsing
         *  of a UI definition. It is normally not necessary to implement this,
         *  unless you need to perform special cleanup actions. {@link Gtk.Window} sets
         *  the {@link Gtk.Widget.visible} property here.
         * @param builder 
         * @virtual
         */
        vfunc_parser_finished(builder: Gtk.Builder): void;

        /**
         * Sets a property of a buildable object.
         *  It is normally not necessary to implement this, `g_object_set_property()`
         *  is used by default. {@link Gtk.Window} implements this to delay showing itself
         *  (i.e. setting the {@link Gtk.Widget.visible} property) until the whole
         *  interface is created.
         * @param builder 
         * @param name 
         * @param value 
         * @virtual
         */
        vfunc_set_buildable_property(builder: Gtk.Builder, name: string, value: unknown): void;

        /**
         * Stores the id attribute given in the {@link Gtk.Builder} UI definition.
         *   {@link Gtk.Widget} stores the name as object data. Implement this method if your
         *   object has some notion of “ID” and it makes sense to map the XML id
         *   attribute to it.
         * @param id 
         * @virtual
         */
        vfunc_set_id(id: string): void;
    }


    namespace Box {
        // Signal signatures
        interface SignalSignatures extends Gtk.Box.SignalSignatures {
            "notify::vertical": (pspec: GObject.ParamSpec) => void;
            "notify::children": (pspec: GObject.ParamSpec) => void;
            "notify::child": (pspec: GObject.ParamSpec) => void;
            "notify::baseline-child": (pspec: GObject.ParamSpec) => void;
            "notify::baseline-position": (pspec: GObject.ParamSpec) => void;
            "notify::homogeneous": (pspec: GObject.ParamSpec) => void;
            "notify::spacing": (pspec: GObject.ParamSpec) => void;
            "notify::can-focus": (pspec: GObject.ParamSpec) => void;
            "notify::can-target": (pspec: GObject.ParamSpec) => void;
            "notify::css-classes": (pspec: GObject.ParamSpec) => void;
            "notify::css-name": (pspec: GObject.ParamSpec) => void;
            "notify::cursor": (pspec: GObject.ParamSpec) => void;
            "notify::focus-on-click": (pspec: GObject.ParamSpec) => void;
            "notify::focusable": (pspec: GObject.ParamSpec) => void;
            "notify::halign": (pspec: GObject.ParamSpec) => void;
            "notify::has-default": (pspec: GObject.ParamSpec) => void;
            "notify::has-focus": (pspec: GObject.ParamSpec) => void;
            "notify::has-tooltip": (pspec: GObject.ParamSpec) => void;
            "notify::height-request": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::layout-manager": (pspec: GObject.ParamSpec) => void;
            "notify::limit-events": (pspec: GObject.ParamSpec) => void;
            "notify::margin-bottom": (pspec: GObject.ParamSpec) => void;
            "notify::margin-end": (pspec: GObject.ParamSpec) => void;
            "notify::margin-start": (pspec: GObject.ParamSpec) => void;
            "notify::margin-top": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::opacity": (pspec: GObject.ParamSpec) => void;
            "notify::overflow": (pspec: GObject.ParamSpec) => void;
            "notify::parent": (pspec: GObject.ParamSpec) => void;
            "notify::receives-default": (pspec: GObject.ParamSpec) => void;
            "notify::root": (pspec: GObject.ParamSpec) => void;
            "notify::scale-factor": (pspec: GObject.ParamSpec) => void;
            "notify::sensitive": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-markup": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-text": (pspec: GObject.ParamSpec) => void;
            "notify::valign": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::visible": (pspec: GObject.ParamSpec) => void;
            "notify::width-request": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Gtk.Box.ConstructorProps {
            vertical: boolean;
            children: Gtk.Widget[];
            child: Gtk.Widget | null;
        }
    }

    /**
     * @gir-type Class
     * @deprecated
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

        get child(): Gtk.Widget | null;
        set child(val: Gtk.Widget | null);

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

        static ["new"](): Box;

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

        get_child(): Gtk.Widget | null;

        /**
         * @param value 
         */
        set_child(value: Gtk.Widget | null): void;
    }


    namespace Slider {
        // Signal signatures
        interface SignalSignatures extends Gtk.Scale.SignalSignatures {
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
            "notify::restrict-to-fill-level": (pspec: GObject.ParamSpec) => void;
            "notify::round-digits": (pspec: GObject.ParamSpec) => void;
            "notify::show-fill-level": (pspec: GObject.ParamSpec) => void;
            "notify::can-focus": (pspec: GObject.ParamSpec) => void;
            "notify::can-target": (pspec: GObject.ParamSpec) => void;
            "notify::css-classes": (pspec: GObject.ParamSpec) => void;
            "notify::css-name": (pspec: GObject.ParamSpec) => void;
            "notify::cursor": (pspec: GObject.ParamSpec) => void;
            "notify::focus-on-click": (pspec: GObject.ParamSpec) => void;
            "notify::focusable": (pspec: GObject.ParamSpec) => void;
            "notify::halign": (pspec: GObject.ParamSpec) => void;
            "notify::has-default": (pspec: GObject.ParamSpec) => void;
            "notify::has-focus": (pspec: GObject.ParamSpec) => void;
            "notify::has-tooltip": (pspec: GObject.ParamSpec) => void;
            "notify::height-request": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::layout-manager": (pspec: GObject.ParamSpec) => void;
            "notify::limit-events": (pspec: GObject.ParamSpec) => void;
            "notify::margin-bottom": (pspec: GObject.ParamSpec) => void;
            "notify::margin-end": (pspec: GObject.ParamSpec) => void;
            "notify::margin-start": (pspec: GObject.ParamSpec) => void;
            "notify::margin-top": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::opacity": (pspec: GObject.ParamSpec) => void;
            "notify::overflow": (pspec: GObject.ParamSpec) => void;
            "notify::parent": (pspec: GObject.ParamSpec) => void;
            "notify::receives-default": (pspec: GObject.ParamSpec) => void;
            "notify::root": (pspec: GObject.ParamSpec) => void;
            "notify::scale-factor": (pspec: GObject.ParamSpec) => void;
            "notify::sensitive": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-markup": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-text": (pspec: GObject.ParamSpec) => void;
            "notify::valign": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::visible": (pspec: GObject.ParamSpec) => void;
            "notify::width-request": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Gtk.Scale.ConstructorProps {
            value: number;
            min: number;
            max: number;
            step: number;
            page: number;
        }
    }

    /**
     * @gir-type Class
     */
    class Slider extends Gtk.Scale {
        static $gtype: GObject.GType<Slider>;

        // Properties
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


    namespace Window {
        // Signal signatures
        interface SignalSignatures extends Gtk.Window.SignalSignatures {
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
            "notify::application": (pspec: GObject.ParamSpec) => void;
            "notify::child": (pspec: GObject.ParamSpec) => void;
            "notify::decorated": (pspec: GObject.ParamSpec) => void;
            "notify::default-height": (pspec: GObject.ParamSpec) => void;
            "notify::default-widget": (pspec: GObject.ParamSpec) => void;
            "notify::default-width": (pspec: GObject.ParamSpec) => void;
            "notify::deletable": (pspec: GObject.ParamSpec) => void;
            "notify::destroy-with-parent": (pspec: GObject.ParamSpec) => void;
            "notify::display": (pspec: GObject.ParamSpec) => void;
            "notify::focus-visible": (pspec: GObject.ParamSpec) => void;
            "notify::focus-widget": (pspec: GObject.ParamSpec) => void;
            "notify::fullscreened": (pspec: GObject.ParamSpec) => void;
            "notify::gravity": (pspec: GObject.ParamSpec) => void;
            "notify::handle-menubar-accel": (pspec: GObject.ParamSpec) => void;
            "notify::hide-on-close": (pspec: GObject.ParamSpec) => void;
            "notify::icon-name": (pspec: GObject.ParamSpec) => void;
            "notify::is-active": (pspec: GObject.ParamSpec) => void;
            "notify::maximized": (pspec: GObject.ParamSpec) => void;
            "notify::mnemonics-visible": (pspec: GObject.ParamSpec) => void;
            "notify::modal": (pspec: GObject.ParamSpec) => void;
            "notify::resizable": (pspec: GObject.ParamSpec) => void;
            "notify::startup-id": (pspec: GObject.ParamSpec) => void;
            "notify::suspended": (pspec: GObject.ParamSpec) => void;
            "notify::title": (pspec: GObject.ParamSpec) => void;
            "notify::titlebar": (pspec: GObject.ParamSpec) => void;
            "notify::transient-for": (pspec: GObject.ParamSpec) => void;
            "notify::can-focus": (pspec: GObject.ParamSpec) => void;
            "notify::can-target": (pspec: GObject.ParamSpec) => void;
            "notify::css-classes": (pspec: GObject.ParamSpec) => void;
            "notify::css-name": (pspec: GObject.ParamSpec) => void;
            "notify::cursor": (pspec: GObject.ParamSpec) => void;
            "notify::focus-on-click": (pspec: GObject.ParamSpec) => void;
            "notify::focusable": (pspec: GObject.ParamSpec) => void;
            "notify::halign": (pspec: GObject.ParamSpec) => void;
            "notify::has-default": (pspec: GObject.ParamSpec) => void;
            "notify::has-focus": (pspec: GObject.ParamSpec) => void;
            "notify::has-tooltip": (pspec: GObject.ParamSpec) => void;
            "notify::height-request": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand": (pspec: GObject.ParamSpec) => void;
            "notify::hexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::layout-manager": (pspec: GObject.ParamSpec) => void;
            "notify::limit-events": (pspec: GObject.ParamSpec) => void;
            "notify::margin-end": (pspec: GObject.ParamSpec) => void;
            "notify::margin-start": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::opacity": (pspec: GObject.ParamSpec) => void;
            "notify::overflow": (pspec: GObject.ParamSpec) => void;
            "notify::parent": (pspec: GObject.ParamSpec) => void;
            "notify::receives-default": (pspec: GObject.ParamSpec) => void;
            "notify::root": (pspec: GObject.ParamSpec) => void;
            "notify::scale-factor": (pspec: GObject.ParamSpec) => void;
            "notify::sensitive": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-markup": (pspec: GObject.ParamSpec) => void;
            "notify::tooltip-text": (pspec: GObject.ParamSpec) => void;
            "notify::valign": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand": (pspec: GObject.ParamSpec) => void;
            "notify::vexpand-set": (pspec: GObject.ParamSpec) => void;
            "notify::visible": (pspec: GObject.ParamSpec) => void;
            "notify::width-request": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Gtk.Window.ConstructorProps {
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
         * Shortcut for {@link Gtk.IconTheme.add_search_path}.
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
    type BinClass = typeof Bin;

    /**
     * @gir-type Struct
     */
    abstract class BinPrivate {
        static $gtype: GObject.GType<BinPrivate>;
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
    import Astal40 from 'gi://Astal?version=4.0';
    export default Astal40;
}
// END
