/// <reference path="./gio-2.0.d.ts" />
/// <reference path="./gobject-2.0.d.ts" />
/// <reference path="./glib-2.0.d.ts" />
/// <reference path="./gmodule-2.0.d.ts" />

/**
 * Type Definitions for Gjs (https://gjs.guide/)
 *
 * These type definitions are automatically generated, do not edit them by hand.
 * If you found a bug fix it in `ts-for-gir` or create a bug report on https://github.com/gjsify/ts-for-gir
 *
 * The based EJS template file is used for the generated .d.ts file of each GIR module like Gtk-4.0, GObject-2.0, ...
 */

declare module 'gi://AstalWp?version=0.1' {

// Module dependencies
import type Gio from 'gi://Gio?version=2.0';
import type GObject from 'gi://GObject?version=2.0';
import type GLib from 'gi://GLib?version=2.0';
import type GModule from 'gi://GModule?version=2.0';

export namespace AstalWp {

    /**
     * AstalWp-0.1
     */


    /**
     * @gir-type Enum
     */
    export namespace Available {
        export const $gtype: GObject.GType<Available>;
    }

    /**
     * @gir-type Enum
     */
    enum Available {
        UNKNOWN,
        NO,
        YES,
    }


    /**
     * @gir-type Enum
     */
    export namespace DeviceType {
        export const $gtype: GObject.GType<DeviceType>;
    }

    /**
     * @gir-type Enum
     */
    enum DeviceType {
        UNKNOWN,
        AUDIO_DEVICE,
        VIDEO_DEVICE,
    }


    /**
     * @gir-type Enum
     */
    export namespace Direction {
        export const $gtype: GObject.GType<Direction>;
    }

    /**
     * @gir-type Enum
     */
    enum Direction {
        INPUT,
        OUTPUT,
    }


    /**
     * @gir-type Enum
     */
    export namespace MediaCategory {
        export const $gtype: GObject.GType<MediaCategory>;
    }

    /**
     * @gir-type Enum
     */
    enum MediaCategory {
        UNKNOWN,
        PLAYBACK,
        CAPTURE,
        DUPLEX,
        MONITOR,
        MANAGER,
    }


    /**
     * @gir-type Enum
     */
    export namespace MediaClass {
        export const $gtype: GObject.GType<MediaClass>;
    }

    /**
     * @gir-type Enum
     */
    enum MediaClass {
        UNKNOWN,
        AUDIO_SOURCE,
        AUDIO_SINK,
        STREAM_INPUT_AUDIO,
        STREAM_OUTPUT_AUDIO,
        VIDEO_SOURCE,
        VIDEO_SINK,
        STREAM_INPUT_VIDEO,
        STREAM_OUTPUT_VIDEO,
        AUDIO_SOURCE_VIRTUAL,
    }


    /**
     * @gir-type Enum
     */
    export namespace MediaRole {
        export const $gtype: GObject.GType<MediaRole>;
    }

    /**
     * @gir-type Enum
     */
    enum MediaRole {
        UNKNOWN,
        MOVIE,
        MUSIC,
        CAMERA,
        SCREEN,
        COMMUNICATION,
        GAME,
        NOTIFICATION,
        DSP,
        PRODUCTION,
        ACCESSIBILITY,
        TEST,
    }


    /**
     * @gir-type Enum
     */
    export namespace NodeState {
        export const $gtype: GObject.GType<NodeState>;
    }

    /**
     * @gir-type Enum
     */
    enum NodeState {
        ERROR,
        CREATING,
        SUSPENDED,
        IDLE,
        RUNNING,
    }


    /**
     * @gir-type Enum
     */
    export namespace Scale {
        export const $gtype: GObject.GType<Scale>;
    }

    /**
     * @gir-type Enum
     */
    enum Scale {
        LINEAR,
        CUBIC,
    }


    const MAJOR_VERSION: number;

    const MICRO_VERSION: number;

    const MINOR_VERSION: number;

    const VERSION: string;

    /**
     * @param string 
     */
    function device_type_from_string(string: string): DeviceType;

    /**
     * @param device_type 
     */
    function device_type_to_string(device_type: DeviceType): string;

    /**
     * gets the default wireplumber object.
     * @returns gets the default wireplumber object.
     */
    function get_default(): Wp;

    /**
     * @param string 
     */
    function media_category_from_string(string: string): MediaCategory;

    /**
     * @param category 
     */
    function media_category_to_string(category: MediaCategory): string;

    /**
     * @param string 
     */
    function media_class_from_string(string: string): MediaClass;

    /**
     * @param media_class 
     */
    function media_class_to_string(media_class: MediaClass): string;

    /**
     * @param string 
     */
    function media_role_from_string(string: string): MediaRole;

    /**
     * @param role 
     */
    function media_role_to_string(role: MediaRole): string;

    namespace Audio {
        // Signal signatures
        interface SignalSignatures extends GObject.Object.SignalSignatures {
            /**
             * @signal
             * @run-first
             */
            "device-added": (arg0: Device) => void;
            /**
             * @signal
             * @run-first
             */
            "device-removed": (arg0: Device) => void;
            /**
             * @signal
             * @run-first
             */
            "microphone-added": (arg0: Endpoint) => void;
            /**
             * @signal
             * @run-first
             */
            "microphone-removed": (arg0: Endpoint) => void;
            /**
             * @signal
             * @run-first
             */
            "recorder-added": (arg0: Stream) => void;
            /**
             * @signal
             * @run-first
             */
            "recorder-removed": (arg0: Stream) => void;
            /**
             * @signal
             * @run-first
             */
            "speaker-added": (arg0: Endpoint) => void;
            /**
             * @signal
             * @run-first
             */
            "speaker-removed": (arg0: Endpoint) => void;
            /**
             * @signal
             * @run-first
             */
            "stream-added": (arg0: Stream) => void;
            /**
             * @signal
             * @run-first
             */
            "stream-removed": (arg0: Stream) => void;
            "notify::default-microphone": (pspec: GObject.ParamSpec) => void;
            "notify::default-speaker": (pspec: GObject.ParamSpec) => void;
            "notify::devices": (pspec: GObject.ParamSpec) => void;
            "notify::microphones": (pspec: GObject.ParamSpec) => void;
            "notify::recorders": (pspec: GObject.ParamSpec) => void;
            "notify::speakers": (pspec: GObject.ParamSpec) => void;
            "notify::streams": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends GObject.Object.ConstructorProps {
            default_microphone: Endpoint;
            defaultMicrophone: Endpoint;
            default_speaker: Endpoint;
            defaultSpeaker: Endpoint;
            devices: Device[] | null;
            microphones: Endpoint[] | null;
            recorders: Stream[] | null;
            speakers: Endpoint[] | null;
            streams: Stream[] | null;
        }
    }

    /**
     * is instanciated by {@link AstalWp.Wp}. An instance of this class can only be received there.
     * 
     *  This is a convenience class and acts as a filter for {@link AstalWp.Wp} to filter for audio
     * endpoints and devices.
     * @gir-type Class
     */
    class Audio extends GObject.Object {
        static $gtype: GObject.GType<Audio>;

        // Properties
        /**
         * The AstalEndpoint object representing the default microphone
         * @read-only
         */
        get default_microphone(): Endpoint;

        /**
         * The AstalEndpoint object representing the default microphone
         * @read-only
         */
        get defaultMicrophone(): Endpoint;

        /**
         * The AstalEndpoint object representing the default speaker
         * @read-only
         */
        get default_speaker(): Endpoint;

        /**
         * The AstalEndpoint object representing the default speaker
         * @read-only
         */
        get defaultSpeaker(): Endpoint;

        /**
         * A list of AstalWpEndpoint objects
         * @read-only
         */
        get devices(): Device[] | null;

        /**
         * A list of AstalWpEndpoint objects
         * @read-only
         */
        get microphones(): Endpoint[] | null;

        /**
         * A list of AstalWpStream objects
         * @read-only
         */
        get recorders(): Stream[] | null;

        /**
         * A list of AstalWpEndpoint objects
         * @read-only
         */
        get speakers(): Endpoint[] | null;

        /**
         * A list of AstalWpStream objects
         * @read-only
         */
        get streams(): Stream[] | null;

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Audio.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Audio.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](wp: Wp): Audio;

        // Signals
        /** @signal */
        connect<K extends keyof Audio.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Audio.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Audio.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Audio.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Audio.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Audio.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        /**
         * gets the default microphone object
         */
        get_default_microphone(): Endpoint;

        /**
         * gets the default speaker object
         */
        get_default_speaker(): Endpoint;

        /**
         * gets the device with the given id
         * @param id the id of the device
         */
        get_device(id: number): Device | null;

        /**
         * a GList containing the devices
         */
        get_devices(): Device[] | null;

        /**
         * gets the microphone with the given id
         * @param id the id of the endpoint
         */
        get_microphone(id: number): Endpoint | null;

        /**
         * a GList containing the microphones
         */
        get_microphones(): Endpoint[] | null;

        /**
         * the node with the given id
         * @param id the id of the endpoint
         */
        get_node(id: number): Node | null;

        /**
         * gets the recorder with the given id
         * @param id the id of the endpoint
         */
        get_recorder(id: number): Stream | null;

        /**
         * a GList containing the recorders
         */
        get_recorders(): Stream[] | null;

        /**
         * gets the speaker with the given id
         * @param id the id of the endpoint
         */
        get_speaker(id: number): Endpoint | null;

        /**
         * a GList containing the speakers
         */
        get_speakers(): Endpoint[] | null;

        /**
         * gets the stream with the given id
         * @param id the id of the endpoint
         */
        get_stream(id: number): Stream | null;

        /**
         * a GList containing the streams
         */
        get_streams(): Stream[] | null;
    }


    namespace Channel {
        // Signal signatures
        interface SignalSignatures extends GObject.Object.SignalSignatures {
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::volume": (pspec: GObject.ParamSpec) => void;
            "notify::volume-icon": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends GObject.Object.ConstructorProps {
            name: string;
            volume: number;
            volume_icon: string;
            volumeIcon: string;
        }
    }

    /**
     * @gir-type Class
     */
    class Channel extends GObject.Object {
        static $gtype: GObject.GType<Channel>;

        // Properties
        /**
         * @construct-only
         * @default null
         */
        get name(): string;

        /**
         * @default 0
         */
        get volume(): number;
        set volume(val: number);

        /**
         * @read-only
         * @default audio-volume-muted
         */
        get volume_icon(): string;

        /**
         * @read-only
         * @default audio-volume-muted
         */
        get volumeIcon(): string;

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Channel.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Channel.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        // Signals
        /** @signal */
        connect<K extends keyof Channel.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Channel.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Channel.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Channel.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Channel.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Channel.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        /**
         * the name of the channel
         */
        get_name(): string;

        /**
         * the volume of the channel
         */
        get_volume(): number;

        get_volume_icon(): string;

        /**
         * sets the volume for this channel. Note that if {@link AstalWp.Node.lock_channels} is true for
         * the node this channel is associated with, this method will set the volume for all channels.
         * @param volume 
         */
        set_volume(volume: number): void;
    }


    namespace Device {
        // Signal signatures
        interface SignalSignatures extends GObject.Object.SignalSignatures {
            "notify::active-profile-id": (pspec: GObject.ParamSpec) => void;
            "notify::description": (pspec: GObject.ParamSpec) => void;
            "notify::device-type": (pspec: GObject.ParamSpec) => void;
            "notify::form-factor": (pspec: GObject.ParamSpec) => void;
            "notify::icon": (pspec: GObject.ParamSpec) => void;
            "notify::id": (pspec: GObject.ParamSpec) => void;
            "notify::input-route-id": (pspec: GObject.ParamSpec) => void;
            "notify::input-routes": (pspec: GObject.ParamSpec) => void;
            "notify::output-route-id": (pspec: GObject.ParamSpec) => void;
            "notify::output-routes": (pspec: GObject.ParamSpec) => void;
            "notify::profiles": (pspec: GObject.ParamSpec) => void;
            "notify::routes": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends GObject.Object.ConstructorProps {
            active_profile_id: number;
            activeProfileId: number;
            description: string | null;
            device_type: DeviceType;
            deviceType: DeviceType;
            form_factor: string | null;
            formFactor: string | null;
            icon: string;
            id: number;
            input_route_id: number;
            inputRouteId: number;
            input_routes: Route[] | null;
            inputRoutes: Route[] | null;
            output_route_id: number;
            outputRouteId: number;
            output_routes: Route[] | null;
            outputRoutes: Route[] | null;
            profiles: Profile[] | null;
            routes: Route[] | null;
        }
    }

    /**
     * @gir-type Class
     */
    class Device extends GObject.Object {
        static $gtype: GObject.GType<Device>;

        // Properties
        /**
         * The id of the currently active profile.
         * @default 0
         */
        get active_profile_id(): number;
        set active_profile_id(val: number);

        /**
         * The id of the currently active profile.
         * @default 0
         */
        get activeProfileId(): number;
        set activeProfileId(val: number);

        /**
         * @read-only
         * @default null
         */
        get description(): string | null;

        /**
         * The type of this device
         * @read-only
         * @default AstalWp.DeviceType.AUDIO_DEVICE
         */
        get device_type(): DeviceType;

        /**
         * The type of this device
         * @read-only
         * @default AstalWp.DeviceType.AUDIO_DEVICE
         */
        get deviceType(): DeviceType;

        /**
         * The from factor of this device.
         * @read-only
         * @default null
         */
        get form_factor(): string | null;

        /**
         * The from factor of this device.
         * @read-only
         * @default null
         */
        get formFactor(): string | null;

        /**
         * The icon name for this device.
         * @read-only
         * @default null
         */
        get icon(): string;

        /**
         * The id of this device.
         * @read-only
         * @default 0
         */
        get id(): number;

        /**
         * The id of the currently active input route.
         * @default 0
         */
        get input_route_id(): number;
        set input_route_id(val: number);

        /**
         * The id of the currently active input route.
         * @default 0
         */
        get inputRouteId(): number;
        set inputRouteId(val: number);

        /**
         * A list of available input routes
         * @read-only
         */
        get input_routes(): Route[] | null;

        /**
         * A list of available input routes
         * @read-only
         */
        get inputRoutes(): Route[] | null;

        /**
         * The id of the currently active output route.
         * @default 0
         */
        get output_route_id(): number;
        set output_route_id(val: number);

        /**
         * The id of the currently active output route.
         * @default 0
         */
        get outputRouteId(): number;
        set outputRouteId(val: number);

        /**
         * A list of available output routes
         * @read-only
         */
        get output_routes(): Route[] | null;

        /**
         * A list of available output routes
         * @read-only
         */
        get outputRoutes(): Route[] | null;

        /**
         * A list of available profiles
         * @read-only
         */
        get profiles(): Profile[] | null;

        /**
         * A list of available routes
         * @read-only
         */
        get routes(): Route[] | null;

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Device.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Device.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        // Signals
        /** @signal */
        connect<K extends keyof Device.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Device.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Device.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Device.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Device.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Device.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        /**
         * gets the currently active profile of this device
         */
        get_active_profile_id(): number;

        /**
         * gets the description of this device
         */
        get_description(): string | null;

        /**
         * gets the type of this device
         */
        get_device_type(): DeviceType;

        /**
         * gets the form factor of this device.
         */
        get_form_factor(): string | null;

        /**
         * gets the icon of this device
         */
        get_icon(): string;

        /**
         * gets the id of this device
         */
        get_id(): number;

        /**
         * gets the currently active input route of this device
         */
        get_input_route_id(): number;

        /**
         * gets a GList containing the input routes
         */
        get_input_routes(): Route[] | null;

        /**
         * gets the currently active output route of this device
         */
        get_output_route_id(): number;

        /**
         * gets a GList containing the output routes
         */
        get_output_routes(): Route[] | null;

        /**
         * gets the profile with the given id
         * @param id the id of the profile
         */
        get_profile(id: number): Profile | null;

        /**
         * gets a GList containing the profiles
         */
        get_profiles(): Profile[] | null;

        /**
         * Gets the pipewire property with the give key. You should use the GObject properties of this node
         * whereever possible, as you can get notified on changes, which is not the case here.
         * @param key 
         */
        get_pw_property(key: string): string | null;

        /**
         * gets the route with the given id
         * @param id the id of the route
         */
        get_route(id: number): Route | null;

        /**
         * gets a GList containing the routes
         */
        get_routes(): Route[] | null;

        /**
         * sets the profile for this device
         * @param profile_id the id of the profile
         */
        set_active_profile_id(profile_id: number): void;

        /**
         * sets the route for this device. You should use the {@link AstalWp.Endpoint.set_route} instead.
         * @param route 
         * @param card_device card device index
         */
        set_route(route: Route, card_device: number): void;
    }


    namespace Endpoint {
        // Signal signatures
        interface SignalSignatures extends Node.SignalSignatures {
            "notify::device": (pspec: GObject.ParamSpec) => void;
            "notify::device-id": (pspec: GObject.ParamSpec) => void;
            "notify::is-default": (pspec: GObject.ParamSpec) => void;
            "notify::route": (pspec: GObject.ParamSpec) => void;
            "notify::route-id": (pspec: GObject.ParamSpec) => void;
            "notify::routes": (pspec: GObject.ParamSpec) => void;
            "notify::channels": (pspec: GObject.ParamSpec) => void;
            "notify::description": (pspec: GObject.ParamSpec) => void;
            "notify::icon": (pspec: GObject.ParamSpec) => void;
            "notify::id": (pspec: GObject.ParamSpec) => void;
            "notify::lock-channels": (pspec: GObject.ParamSpec) => void;
            "notify::media-class": (pspec: GObject.ParamSpec) => void;
            "notify::mute": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::path": (pspec: GObject.ParamSpec) => void;
            "notify::serial": (pspec: GObject.ParamSpec) => void;
            "notify::state": (pspec: GObject.ParamSpec) => void;
            "notify::volume": (pspec: GObject.ParamSpec) => void;
            "notify::volume-icon": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Node.ConstructorProps {
            device: Device | null;
            device_id: number;
            deviceId: number;
            is_default: boolean;
            isDefault: boolean;
            route: Route | null;
            route_id: number;
            routeId: number;
            routes: Route[] | null;
        }
    }

    /**
     * @gir-type Class
     */
    class Endpoint extends Node {
        static $gtype: GObject.GType<Endpoint>;

        // Properties
        /**
         * The the device associated with this endpoint.
         * @read-only
         */
        get device(): Device | null;

        /**
         * The id of the device associated with this endpoint.
         * @read-only
         * @default 0
         */
        get device_id(): number;

        /**
         * The id of the device associated with this endpoint.
         * @read-only
         * @default 0
         */
        get deviceId(): number;

        /**
         * Whether this node is the default one used for this media-class. Note that setting this
         * property to false has no effect.
         * @default false
         */
        get is_default(): boolean;
        set is_default(val: boolean);

        /**
         * Whether this node is the default one used for this media-class. Note that setting this
         * property to false has no effect.
         * @default false
         */
        get isDefault(): boolean;
        set isDefault(val: boolean);

        get route(): Route | null;
        set route(val: Route | null);

        /**
         * @default 0
         */
        get route_id(): number;
        set route_id(val: number);

        /**
         * @default 0
         */
        get routeId(): number;
        set routeId(val: number);

        /**
         * A list of available routes
         * @read-only
         */
        get routes(): Route[] | null;

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Endpoint.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Endpoint.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        // Signals
        /** @signal */
        connect<K extends keyof Endpoint.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Endpoint.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Endpoint.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Endpoint.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Endpoint.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Endpoint.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        /**
         * gets the device associated with this endpoint
         */
        get_device(): Device | null;

        /**
         * gets the id of the device associated with this endpoint
         */
        get_device_id(): number;

        /**
         * is this endpoint configured as the default.
         */
        get_is_default(): boolean;

        /**
         * Gets the currently active {@link AstalWp.Route}
         */
        get_route(): Route | null;

        /**
         * gets the id of the currently active route
         */
        get_route_id(): number;

        /**
         * Gets a list of available routes.
         * This list is filtered and contains only routes, that are actually available. You can get a full
         * list of routes from {@link AstalWp.Device.routes}
         */
        get_routes(): Route[] | null;

        /**
         * Sets this endpoint as the default
         * @param is_default 
         */
        set_is_default(is_default: boolean): void;

        /**
         * Sets the currently active {@link AstalWp.Route}
         * @param route 
         */
        set_route(route: Route): void;

        /**
         * Sets the currently active route id
         * @param route_id 
         */
        set_route_id(route_id: number): void;
    }


    namespace Node {
        // Signal signatures
        interface SignalSignatures extends GObject.Object.SignalSignatures {
            "notify::channels": (pspec: GObject.ParamSpec) => void;
            "notify::description": (pspec: GObject.ParamSpec) => void;
            "notify::icon": (pspec: GObject.ParamSpec) => void;
            "notify::id": (pspec: GObject.ParamSpec) => void;
            "notify::lock-channels": (pspec: GObject.ParamSpec) => void;
            "notify::media-class": (pspec: GObject.ParamSpec) => void;
            "notify::mute": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::path": (pspec: GObject.ParamSpec) => void;
            "notify::serial": (pspec: GObject.ParamSpec) => void;
            "notify::state": (pspec: GObject.ParamSpec) => void;
            "notify::volume": (pspec: GObject.ParamSpec) => void;
            "notify::volume-icon": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends GObject.Object.ConstructorProps {
            channels: Channel[] | null;
            description: string | null;
            icon: string;
            id: number;
            lock_channels: boolean;
            lockChannels: boolean;
            media_class: MediaClass;
            mediaClass: MediaClass;
            mute: boolean;
            name: string | null;
            path: string | null;
            serial: number;
            state: NodeState;
            volume: number;
            volume_icon: string;
            volumeIcon: string;
        }
    }

    /**
     * @gir-type Class
     */
    class Node extends GObject.Object {
        static $gtype: GObject.GType<Node>;

        // Properties
        /**
         * A list of per channel volumes
         * @read-only
         */
        get channels(): Channel[] | null;

        /**
         * The description of this node
         * @read-only
         * @default null
         */
        get description(): string | null;

        /**
         * The icon of this node. Note that nodes do not have icons associated with them in
         * pipewire, so the icon of the associated device is used instead.
         * @construct-only
         * @default audio-card-symbolic
         */
        get icon(): string;

        /**
         * The pipewire id of this node.
         * @read-only
         * @default 0
         */
        get id(): number;

        /**
         * Whether to lock the channels together or not.
         * @default false
         */
        get lock_channels(): boolean;
        set lock_channels(val: boolean);

        /**
         * Whether to lock the channels together or not.
         * @default false
         */
        get lockChannels(): boolean;
        set lockChannels(val: boolean);

        /**
         * The media class of this node
         * @read-only
         * @default AstalWp.MediaClass.AUDIO_SOURCE
         */
        get media_class(): MediaClass;

        /**
         * The media class of this node
         * @read-only
         * @default AstalWp.MediaClass.AUDIO_SOURCE
         */
        get mediaClass(): MediaClass;

        /**
         * The mute state of this node
         * @default true
         */
        get mute(): boolean;
        set mute(val: boolean);

        /**
         * The name of this node
         * @read-only
         * @default null
         */
        get name(): string | null;

        /**
         * The object path of this node
         * @read-only
         * @default null
         */
        get path(): string | null;

        /**
         * The object serial of this node.
         * @read-only
         * @default 0
         */
        get serial(): number;

        /**
         * the current state of this node.
         * @read-only
         * @default AstalWp.NodeState.CREATING
         */
        get state(): NodeState;

        /**
         * The volume of this node
         * @default 0
         */
        get volume(): number;
        set volume(val: number);

        /**
         * The volume icon of this node
         * @read-only
         * @default audio-volume-muted
         */
        get volume_icon(): string;

        /**
         * The volume icon of this node
         * @read-only
         * @default audio-volume-muted
         */
        get volumeIcon(): string;

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Node.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Node.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        // Signals
        /** @signal */
        connect<K extends keyof Node.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Node.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Node.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Node.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Node.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Node.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Virtual methods
        /**
         * @param key 
         * @param type 
         * @param value 
         * @virtual
         */
        vfunc_metadata_changed(key: string, type: string, value: string): void;

        /**
         * @param id 
         * @virtual
         */
        vfunc_params_changed(id: string): void;

        // Methods
        /**
         * gets the list representing the per channel volumes
         */
        get_channels(): Channel[] | null;

        /**
         * gets the description of this node
         */
        get_description(): string | null;

        /**
         * gets the icon for this node
         */
        get_icon(): string;

        /**
         * gets the id of the node.
         */
        get_id(): number;

        get_lock_channels(): boolean;

        /**
         * gets the media class of the node.
         */
        get_media_class(): MediaClass;

        /**
         * gets the mute status of the node.
         */
        get_mute(): boolean;

        /**
         * gets the name of this node
         */
        get_name(): string | null;

        /**
         * gets the object path of this node
         */
        get_path(): string | null;

        /**
         * Gets the pipewire property with the give key. You should use the GObject properties of this node
         * whereever possible, as you can get notified on changes, which is not the case here.
         * @param key 
         */
        get_pw_property(key: string): string | null;

        /**
         * gets the serial number of this node
         */
        get_serial(): number;

        /**
         * gets the current state of this node
         */
        get_state(): NodeState;

        /**
         * gets the volume
         */
        get_volume(): number;

        get_volume_icon(): string;

        /**
         * @param key 
         * @param type 
         * @param value 
         */
        metadata_changed(key: string, type: string, value: string): void;

        /**
         * @param id 
         */
        params_changed(id: string): void;

        /**
         * Lock the channel volumes together. If set, all channels will always have the same volume.
         * @param lock_channels 
         */
        set_lock_channels(lock_channels: boolean): void;

        /**
         * Sets the mute status for the node.
         * @param mute A boolean indicating whether to mute the node.
         */
        set_mute(mute: boolean): void;

        /**
         * Sets the volume level for this node. The volume is clamped to be between
         * 0 and 1.5.
         * @param volume The new volume level to set.
         */
        set_volume(volume: number): void;
    }


    namespace Profile {
        // Signal signatures
        interface SignalSignatures extends GObject.Object.SignalSignatures {
            "notify::available": (pspec: GObject.ParamSpec) => void;
            "notify::description": (pspec: GObject.ParamSpec) => void;
            "notify::index": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::priority": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends GObject.Object.ConstructorProps {
            available: Available;
            description: string;
            index: number;
            name: string;
            priority: number;
        }
    }

    /**
     * @gir-type Class
     */
    class Profile extends GObject.Object {
        static $gtype: GObject.GType<Profile>;

        // Properties
        /**
         * the available state of this profile
         * @construct-only
         * @default AstalWp.Available.UNKNOWN
         */
        get available(): Available;

        /**
         * @construct-only
         * @default null
         */
        get description(): string;

        /**
         * @construct-only
         * @default 0
         */
        get index(): number;

        /**
         * @construct-only
         * @default null
         */
        get name(): string;

        /**
         * @construct-only
         * @default 0
         */
        get priority(): number;

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Profile.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Profile.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        // Signals
        /** @signal */
        connect<K extends keyof Profile.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Profile.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Profile.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Profile.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Profile.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Profile.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        get_available(): Available;

        get_description(): string;

        get_index(): number;

        get_name(): string;

        get_priority(): number;
    }


    namespace Route {
        // Signal signatures
        interface SignalSignatures extends GObject.Object.SignalSignatures {
            "notify::available": (pspec: GObject.ParamSpec) => void;
            "notify::description": (pspec: GObject.ParamSpec) => void;
            "notify::direction": (pspec: GObject.ParamSpec) => void;
            "notify::index": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::priority": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends GObject.Object.ConstructorProps {
            available: Available;
            description: string;
            direction: Direction;
            index: number;
            name: string;
            priority: number;
        }
    }

    /**
     * @gir-type Class
     */
    class Route extends GObject.Object {
        static $gtype: GObject.GType<Route>;

        // Properties
        /**
         * the available state of this route
         * @construct-only
         * @default AstalWp.Available.UNKNOWN
         */
        get available(): Available;

        /**
         * @construct-only
         * @default null
         */
        get description(): string;

        /**
         * The direction for this route
         * @construct-only
         * @default AstalWp.Direction.INPUT
         */
        get direction(): Direction;

        /**
         * @construct-only
         * @default 0
         */
        get index(): number;

        /**
         * @construct-only
         * @default null
         */
        get name(): string;

        /**
         * @construct-only
         * @default 0
         */
        get priority(): number;

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Route.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Route.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        // Signals
        /** @signal */
        connect<K extends keyof Route.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Route.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Route.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Route.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Route.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Route.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        get_available(): Available;

        get_description(): string;

        get_device(): number;

        get_direction(): Direction;

        get_index(): number;

        get_name(): string;

        get_priority(): number;
    }


    namespace Stream {
        // Signal signatures
        interface SignalSignatures extends Node.SignalSignatures {
            "notify::media-category": (pspec: GObject.ParamSpec) => void;
            "notify::media-role": (pspec: GObject.ParamSpec) => void;
            "notify::target-endpoint": (pspec: GObject.ParamSpec) => void;
            "notify::target-serial": (pspec: GObject.ParamSpec) => void;
            "notify::channels": (pspec: GObject.ParamSpec) => void;
            "notify::description": (pspec: GObject.ParamSpec) => void;
            "notify::icon": (pspec: GObject.ParamSpec) => void;
            "notify::id": (pspec: GObject.ParamSpec) => void;
            "notify::lock-channels": (pspec: GObject.ParamSpec) => void;
            "notify::media-class": (pspec: GObject.ParamSpec) => void;
            "notify::mute": (pspec: GObject.ParamSpec) => void;
            "notify::name": (pspec: GObject.ParamSpec) => void;
            "notify::path": (pspec: GObject.ParamSpec) => void;
            "notify::serial": (pspec: GObject.ParamSpec) => void;
            "notify::state": (pspec: GObject.ParamSpec) => void;
            "notify::volume": (pspec: GObject.ParamSpec) => void;
            "notify::volume-icon": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends Node.ConstructorProps {
            media_category: MediaCategory;
            mediaCategory: MediaCategory;
            media_role: MediaRole;
            mediaRole: MediaRole;
            target_endpoint: Endpoint | null;
            targetEndpoint: Endpoint | null;
            target_serial: number;
            targetSerial: number;
        }
    }

    /**
     * @gir-type Class
     */
    class Stream extends Node {
        static $gtype: GObject.GType<Stream>;

        // Properties
        /**
         * the media category of this stream.
         * @read-only
         * @default AstalWp.MediaCategory.UNKNOWN
         */
        get media_category(): MediaCategory;

        /**
         * the media category of this stream.
         * @read-only
         * @default AstalWp.MediaCategory.UNKNOWN
         */
        get mediaCategory(): MediaCategory;

        /**
         * the media role of this stream.
         * @read-only
         * @default AstalWp.MediaRole.UNKNOWN
         */
        get media_role(): MediaRole;

        /**
         * the media role of this stream.
         * @read-only
         * @default AstalWp.MediaRole.UNKNOWN
         */
        get mediaRole(): MediaRole;

        get target_endpoint(): Endpoint | null;
        set target_endpoint(val: Endpoint | null);

        get targetEndpoint(): Endpoint | null;
        set targetEndpoint(val: Endpoint | null);

        /**
         * @default -1
         */
        get target_serial(): number;
        set target_serial(val: number);

        /**
         * @default -1
         */
        get targetSerial(): number;
        set targetSerial(val: number);

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Stream.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Stream.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        // Signals
        /** @signal */
        connect<K extends keyof Stream.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Stream.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Stream.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Stream.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Stream.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Stream.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        get_media_category(): MediaCategory;

        get_media_role(): MediaRole;

        /**
         * get the target {@link AstalWp.Endpoint}
         */
        get_target_endpoint(): Endpoint | null;

        get_target_serial(): number;

        /**
         * set the target {@link AstalWp.Endpoint}
         * @param target 
         */
        set_target_endpoint(target: Endpoint | null): void;

        /**
         * @param serial 
         */
        set_target_serial(serial: number): void;
    }


    namespace Video {
        // Signal signatures
        interface SignalSignatures extends GObject.Object.SignalSignatures {
            /**
             * @signal
             * @run-first
             */
            "device-added": (arg0: Device) => void;
            /**
             * @signal
             * @run-first
             */
            "device-removed": (arg0: Device) => void;
            /**
             * @signal
             * @run-first
             */
            "recorder-added": (arg0: Stream) => void;
            /**
             * @signal
             * @run-first
             */
            "recorder-removed": (arg0: Stream) => void;
            /**
             * @signal
             * @run-first
             */
            "sink-added": (arg0: Endpoint) => void;
            /**
             * @signal
             * @run-first
             */
            "sink-removed": (arg0: Endpoint) => void;
            /**
             * @signal
             * @run-first
             */
            "source-added": (arg0: Endpoint) => void;
            /**
             * @signal
             * @run-first
             */
            "source-removed": (arg0: Endpoint) => void;
            /**
             * @signal
             * @run-first
             */
            "stream-added": (arg0: Stream) => void;
            /**
             * @signal
             * @run-first
             */
            "stream-removed": (arg0: Stream) => void;
            "notify::devices": (pspec: GObject.ParamSpec) => void;
            "notify::recorders": (pspec: GObject.ParamSpec) => void;
            "notify::sinks": (pspec: GObject.ParamSpec) => void;
            "notify::sources": (pspec: GObject.ParamSpec) => void;
            "notify::streams": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends GObject.Object.ConstructorProps {
            devices: Device[] | null;
            recorders: Stream[] | null;
            sinks: Endpoint[] | null;
            sources: Endpoint[] | null;
            streams: Stream[] | null;
        }
    }

    /**
     * is instanciated by {@link AstalWp.Wp}. An instance of class can only be received there.
     * 
     *  This is a convinience class and acts as a filter for {@link AstalWp.Wp} to filter for video
     * endpoints and devices.
     * @gir-type Class
     */
    class Video extends GObject.Object {
        static $gtype: GObject.GType<Video>;

        // Properties
        /**
         * A list of AstalWpEndpoint objects
         * @read-only
         */
        get devices(): Device[] | null;

        /**
         * A list of AstalWpEndpoint objects
         * @read-only
         */
        get recorders(): Stream[] | null;

        /**
         * A list of AstalWpEndpoint objects
         * @read-only
         */
        get sinks(): Endpoint[] | null;

        /**
         * A list of AstalWpEndpoint objects
         * @read-only
         */
        get sources(): Endpoint[] | null;

        /**
         * A list of AstalWpEndpoint objects
         * @read-only
         */
        get streams(): Stream[] | null;

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Video.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Video.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](wp: Wp): Video;

        // Signals
        /** @signal */
        connect<K extends keyof Video.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Video.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Video.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Video.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Video.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Video.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        /**
         * the device with the given id
         * @param id the id of the device
         * @returns the device with the given id
         */
        get_device(id: number): Device | null;

        /**
         * a list containing the devices
         * @returns a GList containing the devices
         */
        get_devices(): Device[] | null;

        /**
         * the recorder with the given id
         * @param id the id of the endpoint
         * @returns the recorder with the given id
         */
        get_recorder(id: number): Stream | null;

        /**
         * a list containing the video recorders
         * @returns a GList containing the video recorders
         */
        get_recorders(): Stream[] | null;

        /**
         * the sink with the given id
         * @param id the id of the endpoint
         * @returns the sink with the given id
         */
        get_sink(id: number): Endpoint | null;

        /**
         * a list containing the video sinks
         * @returns a GList containing the video sinks
         */
        get_sinks(): Endpoint[] | null;

        /**
         * the source with the given id
         * @param id the id of the endpoint
         * @returns the source with the given id
         */
        get_source(id: number): Endpoint | null;

        /**
         * a list containing the video sources
         * @returns a GList containing the video sources
         */
        get_sources(): Endpoint[] | null;

        /**
         * the stream with the given id
         * @param id the id of the endpoint
         * @returns the stream with the given id
         */
        get_stream(id: number): Stream | null;

        /**
         * a list containing the video streams
         * @returns a GList containing the video streams
         */
        get_streams(): Stream[] | null;
    }


    namespace Wp {
        // Signal signatures
        interface SignalSignatures extends GObject.Object.SignalSignatures {
            /**
             * @signal
             * @run-first
             */
            "device-added": (arg0: Device) => void;
            /**
             * @signal
             * @run-first
             */
            "device-removed": (arg0: Device) => void;
            /**
             * @signal
             * @run-first
             */
            "node-added": (arg0: Node) => void;
            /**
             * @signal
             * @run-first
             */
            "node-removed": (arg0: Node) => void;
            /**
             * @signal
             * @run-first
             */
            ready: () => void;
            "notify::audio": (pspec: GObject.ParamSpec) => void;
            "notify::connected": (pspec: GObject.ParamSpec) => void;
            "notify::default-microphone": (pspec: GObject.ParamSpec) => void;
            "notify::default-speaker": (pspec: GObject.ParamSpec) => void;
            "notify::devices": (pspec: GObject.ParamSpec) => void;
            "notify::nodes": (pspec: GObject.ParamSpec) => void;
            "notify::scale": (pspec: GObject.ParamSpec) => void;
            "notify::video": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends GObject.Object.ConstructorProps {
            audio: Audio;
            connected: boolean;
            default_microphone: Endpoint;
            defaultMicrophone: Endpoint;
            default_speaker: Endpoint;
            defaultSpeaker: Endpoint;
            devices: Device[] | null;
            nodes: Node[] | null;
            scale: Scale;
            video: Video;
        }
    }

    /**
     * manages the connection to wireplumber. Usually you don't want to use this class directly, but use
     * the {@link AstalWp.Audio} or {@link AstalWp.Video} instead.
     * @gir-type Class
     */
    class Wp extends GObject.Object {
        static $gtype: GObject.GType<Wp>;

        // Properties
        /**
         * @read-only
         */
        get audio(): Audio;

        /**
         * The connection status to the pipewire daemon
         * @read-only
         * @default false
         */
        get connected(): boolean;

        /**
         * The {@link AstalWp.Endpoint} representing the default micophone
         * @read-only
         */
        get default_microphone(): Endpoint;

        /**
         * The {@link AstalWp.Endpoint} representing the default micophone
         * @read-only
         */
        get defaultMicrophone(): Endpoint;

        /**
         * The {@link AstalWp.Endpoint} representing the default speaker
         * @read-only
         */
        get default_speaker(): Endpoint;

        /**
         * The {@link AstalWp.Endpoint} representing the default speaker
         * @read-only
         */
        get defaultSpeaker(): Endpoint;

        /**
         * A list of {@link AstalWp.Device} objects
         * @read-only
         */
        get devices(): Device[] | null;

        /**
         * A list of {@link AstalWp.Node} objects
         * @read-only
         */
        get nodes(): Node[] | null;

        /**
         * The scale used for the volume
         * @default AstalWp.Scale.CUBIC
         */
        get scale(): Scale;
        set scale(val: Scale);

        /**
         * @read-only
         */
        get video(): Video;

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Wp.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Wp.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        // Signals
        /** @signal */
        connect<K extends keyof Wp.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Wp.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Wp.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Wp.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Wp.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Wp.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Static methods
        /**
         * gets the default wireplumber object.
         */
        static get_default(): Wp;

        // Methods
        /**
         * gets the {@link AstalWp.Audio} object
         * @returns gets the audio object
         */
        get_audio(): Audio;

        /**
         * gets the default microphone object
         * @returns gets the default microphone object
         */
        get_default_microphone(): Endpoint;

        /**
         * gets the default speaker object
         * @returns gets the default speaker object
         */
        get_default_speaker(): Endpoint;

        /**
         * the device with the given id
         * @param id the id of the device
         * @returns the device with the given id
         */
        get_device(id: number): Device | null;

        /**
         * the GList containing the devices
         * @returns a GList containing the devices
         */
        get_devices(): Device[] | null;

        /**
         * the node with the given id
         * @param id the id of the node
         * @returns the node with the given id
         */
        get_node(id: number): Node | null;

        /**
         * finds the AstalWpNode with the give serial.
         * @param serial 
         */
        get_node_by_serial(serial: number): Node | null;

        /**
         * a GList containing all nodes
         * @returns a GList containing the nodes
         */
        get_nodes(): Node[] | null;

        get_scale(): Scale;

        /**
         * gets the video object
         * @returns gets the video object
         */
        get_video(): Video;

        /**
         * @param scale 
         */
        set_scale(scale: Scale): void;
    }


    /**
     * @gir-type Alias
     */
    type AudioClass = typeof Audio;

    /**
     * @gir-type Alias
     */
    type ChannelClass = typeof Channel;

    /**
     * @gir-type Alias
     */
    type DeviceClass = typeof Device;

    /**
     * @gir-type Alias
     */
    type EndpointClass = typeof Endpoint;

    /**
     * @gir-type Alias
     */
    type NodeClass = typeof Node;

    /**
     * @gir-type Alias
     */
    type ProfileClass = typeof Profile;

    /**
     * @gir-type Alias
     */
    type RouteClass = typeof Route;

    /**
     * @gir-type Alias
     */
    type StreamClass = typeof Stream;

    /**
     * @gir-type Alias
     */
    type VideoClass = typeof Video;

    /**
     * @gir-type Alias
     */
    type WpClass = typeof Wp;

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

export default AstalWp;

}

declare module 'gi://AstalWp' {
    import AstalWp01 from 'gi://AstalWp?version=0.1';
    export default AstalWp01;
}
// END
