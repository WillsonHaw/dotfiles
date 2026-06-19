/// <reference path="./glib-2.0.d.ts" />
/// <reference path="./gobject-2.0.d.ts" />
/// <reference path="./gio-2.0.d.ts" />
/// <reference path="./gmodule-2.0.d.ts" />

/**
 * Type Definitions for Gjs (https://gjs.guide/)
 *
 * These type definitions are automatically generated, do not edit them by hand.
 * If you found a bug fix it in `ts-for-gir` or create a bug report on https://github.com/gjsify/ts-for-gir
 *
 * The based EJS template file is used for the generated .d.ts file of each GIR module like Gtk-4.0, GObject-2.0, ...
 */

declare module 'gi://AstalIO?version=0.1' {

// Module dependencies
import type GLib from 'gi://GLib?version=2.0';
import type GObject from 'gi://GObject?version=2.0';
import type Gio from 'gi://Gio?version=2.0';
import type GModule from 'gi://GModule?version=2.0';

export namespace AstalIO {

    /**
     * AstalIO-0.1
     */


    /**
     * @gir-type Struct
     */
    class AppError extends GLib.Error {
        static $gtype: GObject.GType<GLib.Error>;

        // Static fields
        static NAME_OCCUPIED: number;

        static TAKEOVER_FAILED: number;

        // Constructors
        constructor(options: { message: string; code: number });
    }


    const MAJOR_VERSION: number;

    const MINOR_VERSION: number;

    const MICRO_VERSION: number;

    const VERSION: string;

    /**
     * Starts a {@link Gio.SocketService} and binds `XDG_RUNTIME_DIR/astal/<instance_name>.sock`. This socket is then used by the astal 
     * cli. Not meant for public usage, but for {@link AstalIO.Application.acquire_socket}.
     * @param app 
     */
    function acquire_socket(app: Application): [Gio.SocketService, string];

    /**
     * Get a list of running Astal.Application instances. It is the equivalent of `astal --list`.
     */
    function get_instances(): string[];

    /**
     * Quit an an Astal instances. It is the equivalent of `astal --quit -i instance`.
     * @param instance 
     */
    function quit_instance(instance: string): void;

    /**
     * Open the Gtk debug tool of an an Astal instances. It is the equivalent of `astal --inspector -i instance`.
     * @param instance 
     */
    function open_inspector(instance: string): void;

    /**
     * Toggle a Window of an Astal instances. It is the equivalent of `astal -i instance --toggle window`.
     * @param instance 
     * @param window 
     */
    function toggle_window_by_name(instance: string, window: string): void;

    /**
     * Use {@link AstalIO.send_request} instead.
     * @param instance 
     * @param request 
     * @deprecated
     */
    function send_message(instance: string, request: string): string;

    /**
     * Send a request to an Astal instances. It is the equivalent of `astal -i instance "request content"`.
     * @param instance 
     * @param request 
     */
    function send_request(instance: string, request: string): string;

    /**
     * Read the socket of an Astal.Application instance.
     * @param conn 
     */
    function read_sock(conn: Gio.SocketConnection): globalThis.Promise<string>;
    /**
     * Read the socket of an Astal.Application instance.
     * @param conn 
     * @param _callback_ 
     */
    function read_sock(conn: Gio.SocketConnection, _callback_: Gio.AsyncReadyCallback<Gio.SocketConnection> | null): void;
    /**
     * Read the socket of an Astal.Application instance.
     * @param conn 
     * @param _callback_ 
     */
    function read_sock(conn: Gio.SocketConnection, _callback_: Gio.AsyncReadyCallback<Gio.SocketConnection> | null): globalThis.Promise<string> | void;

    /**
     * @param _res_ 
     */
    function read_sock_finish(_res_: Gio.AsyncResult): string;

    /**
     * Write the socket of an Astal.Application instance.
     * @param conn 
     * @param response 
     */
    function write_sock(conn: Gio.SocketConnection, response: string): globalThis.Promise<void>;
    /**
     * Write the socket of an Astal.Application instance.
     * @param conn 
     * @param response 
     * @param _callback_ 
     */
    function write_sock(conn: Gio.SocketConnection, response: string, _callback_: Gio.AsyncReadyCallback<Gio.SocketConnection> | null): void;
    /**
     * Write the socket of an Astal.Application instance.
     * @param conn 
     * @param response 
     * @param _callback_ 
     */
    function write_sock(conn: Gio.SocketConnection, response: string, _callback_: Gio.AsyncReadyCallback<Gio.SocketConnection> | null): globalThis.Promise<void> | void;

    /**
     * @param _res_ 
     */
    function write_sock_finish(_res_: Gio.AsyncResult): void;

    /**
     * Read the contents of a file synchronously.
     * @param path 
     * @deprecated
     */
    function read_file(path: string): string;

    /**
     * Read the contents of a file asynchronously.
     * @param path 
     * @deprecated
     */
    function read_file_async(path: string): globalThis.Promise<string>;
    /**
     * Read the contents of a file asynchronously.
     * @param path 
     * @param _callback_ 
     * @deprecated
     */
    function read_file_async(path: string, _callback_: Gio.AsyncReadyCallback<string> | null): void;
    /**
     * Read the contents of a file asynchronously.
     * @param path 
     * @param _callback_ 
     * @deprecated
     */
    function read_file_async(path: string, _callback_: Gio.AsyncReadyCallback<string> | null): globalThis.Promise<string> | void;

    /**
     * @param _res_ 
     * @deprecated
     */
    function read_file_finish(_res_: Gio.AsyncResult): string;

    /**
     * Write content to a file synchronously.
     * @param path 
     * @param content 
     * @deprecated
     */
    function write_file(path: string, content: string): void;

    /**
     * Write content to a file asynchronously.
     * @param path 
     * @param content 
     * @deprecated
     */
    function write_file_async(path: string, content: string): globalThis.Promise<void>;
    /**
     * Write content to a file asynchronously.
     * @param path 
     * @param content 
     * @param _callback_ 
     * @deprecated
     */
    function write_file_async(path: string, content: string, _callback_: Gio.AsyncReadyCallback<string> | null): void;
    /**
     * Write content to a file asynchronously.
     * @param path 
     * @param content 
     * @param _callback_ 
     * @deprecated
     */
    function write_file_async(path: string, content: string, _callback_: Gio.AsyncReadyCallback<string> | null): globalThis.Promise<void> | void;

    /**
     * @param _res_ 
     * @deprecated
     */
    function write_file_finish(_res_: Gio.AsyncResult): void;

    /**
     * Monitor a file for changes. If the path is a directory, monitor it recursively. The callback will be called passed two parameters: the path of 
     * the file that changed and an {@link Gio.FileMonitorEvent} indicating the reason.
     * @param path 
     * @param callback 
     * @deprecated
     */
    function monitor_file(path: string, callback: GObject.Closure): Gio.FileMonitor | null;

    namespace Daemon {
        // Signal signatures
        interface SignalSignatures extends Gio.Application.SignalSignatures {
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
        interface ConstructorProps extends Gio.Application.ConstructorProps, Application.ConstructorProps {}
    }

    /**
     * @gir-type Class
     * @deprecated
     */
    class Daemon extends Gio.Application implements Application {
        static $gtype: GObject.GType<Daemon>;

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Daemon.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Daemon.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](): Daemon;

        // Signals
        /** @signal */
        connect<K extends keyof Daemon.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Daemon.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Daemon.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Daemon.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Daemon.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Daemon.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
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
         * Handler for an incoming request.
         * @param request Body of the request
         * @param conn The connection which expects the response.
         */
        request(request: string, conn: Gio.SocketConnection): void;

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


    namespace Process {
        // Signal signatures
        interface SignalSignatures extends GObject.Object.SignalSignatures {
            /**
             * When the underlying subprocess writes to its stdout.
             * @signal
             */
            stdout: (arg0: string) => void;
            /**
             * When the underlying subprocess writes to its stderr.
             * @signal
             */
            stderr: (arg0: string) => void;
            /**
             * When the underlying subprocess exits or is terminated.
             * @signal
             */
            exit: (arg0: number, arg1: boolean) => void;
            "notify::argv": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends GObject.Object.ConstructorProps {
            argv: string[];
        }
    }

    /**
     * {@link AstalIO.Process} provides shortcuts for {@link Gio.Subprocess} with sane defaults.
     * @gir-type Class
     * @deprecated
     */
    class Process extends GObject.Object {
        static $gtype: GObject.GType<Process>;

        // Properties
        /**
         * @construct-only
         */
        get argv(): string[];

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Process.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Process.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](cmd: string[]): Process;

        // Signals
        /** @signal */
        connect<K extends keyof Process.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Process.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Process.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Process.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Process.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Process.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Static methods
        /**
         * Start a new subprocess with the given command.
         * The first element of the vector is executed with the remaining elements as the argument list.
         * @param cmd 
         */
        static subprocessv(cmd: string[]): Process;

        /**
         * Start a new subprocess with the given command which is parsed using {@link GLib.shell_parse_argv}.
         * @param cmd 
         */
        static subprocess(cmd: string): Process;

        /**
         * Execute a command synchronously. The first element of the vector is executed with the remaining elements as the argument list.
         * @param cmd 
         */
        static execv(cmd: string[]): string;

        /**
         * Execute a command synchronously. The command is parsed using {@link GLib.shell_parse_argv}.
         * @param cmd 
         */
        static exec(cmd: string): string;

        /**
         * Execute a command asynchronously. The first element of the vector is executed with the remaining elements as the argument list.
         * @param cmd 
         * @param _callback_ 
         */
        static exec_asyncv(cmd: string[], _callback_: Gio.AsyncReadyCallback<Process> | null): void;

        /**
         * @param _res_ 
         */
        static exec_asyncv_finish(_res_: Gio.AsyncResult): string;

        /**
         * Execute a command asynchronously. The command is parsed using {@link GLib.shell_parse_argv}.
         * @param cmd 
         * @param _callback_ 
         */
        static exec_async(cmd: string, _callback_: Gio.AsyncReadyCallback<Process> | null): void;

        /**
         * @param _res_ 
         */
        static exec_finish(_res_: Gio.AsyncResult): string;

        // Methods
        /**
         * Force quit the subprocess.
         */
        kill(): void;

        /**
         * Send a signal to the subprocess.
         * @param signal_num Signal number to be sent
         */
        signal(signal_num: number): void;

        /**
         * Write a line to the subprocess' stdin synchronously.
         * @param _in String to be written to stdin
         */
        write(_in: string): void;

        /**
         * Write a line to the subprocess' stdin asynchronously.
         * @param _in String to be written to stdin
         */
        write_async(_in: string): globalThis.Promise<void>;

        /**
         * Write a line to the subprocess' stdin asynchronously.
         * @param _in String to be written to stdin
         * @param _callback_ 
         */
        write_async(_in: string, _callback_: Gio.AsyncReadyCallback<this> | null): void;

        /**
         * Write a line to the subprocess' stdin asynchronously.
         * @param _in String to be written to stdin
         * @param _callback_ 
         */
        write_async(_in: string, _callback_?: Gio.AsyncReadyCallback<this> | null): globalThis.Promise<void> | void;

        /**
         * @param _res_ 
         */
        write_finish(_res_: Gio.AsyncResult): void;

        get_argv(): string[];
    }


    namespace Time {
        // Signal signatures
        interface SignalSignatures extends GObject.Object.SignalSignatures {
            /**
             * Emitted when the timer ticks.
             * @signal
             */
            now: () => void;
            /**
             * Emitted when the timere is cancelled.
             * @signal
             */
            cancelled: () => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends GObject.Object.ConstructorProps {}
    }

    /**
     * {@link AstalIO.Time} provides shortcuts for GLib timeout functions.
     * @gir-type Class
     * @deprecated
     */
    class Time extends GObject.Object {
        static $gtype: GObject.GType<Time>;

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Time.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Time.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static interval_prio(interval: number, prio: number, fn: GObject.Closure | null): Time;

        static timeout_prio(timeout: number, prio: number, fn: GObject.Closure | null): Time;

        static idle_prio(prio: number, fn: GObject.Closure | null): Time;

        static ["new"](): Time;

        // Signals
        /** @signal */
        connect<K extends keyof Time.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Time.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Time.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Time.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Time.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Time.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Static methods
        /**
         * Start an interval timer. Ticks immediately then every `interval` milliseconds.
         * @param interval Tick every milliseconds.
         * @param fn Optional callback.
         */
        static interval(interval: number, fn: GObject.Closure | null): Time;

        /**
         * Start a timeout timer which ticks after `timeout` milliseconds.
         * @param timeout Tick after milliseconds.
         * @param fn Optional callback.
         */
        static timeout(timeout: number, fn: GObject.Closure | null): Time;

        /**
         * Start a timer which will tick when there are no higher priority tasks pending.
         * @param fn Optional callback.
         */
        static idle(fn: GObject.Closure | null): Time;

        // Methods
        /**
         * Cancel timer and emit `AstalIO.Time::cancelled`
         */
        cancel(): void;
    }


    namespace VariableBase {
        // Signal signatures
        interface SignalSignatures extends GObject.Object.SignalSignatures {
            /**
             * @signal
             */
            changed: () => void;
            /**
             * @signal
             */
            dropped: () => void;
            /**
             * @signal
             */
            error: (arg0: string) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends GObject.Object.ConstructorProps {}
    }

    /**
     * @gir-type Class
     * @deprecated
     */
    class VariableBase extends GObject.Object {
        static $gtype: GObject.GType<VariableBase>;

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: VariableBase.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<VariableBase.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](): VariableBase;

        // Signals
        /** @signal */
        connect<K extends keyof VariableBase.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, VariableBase.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof VariableBase.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, VariableBase.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof VariableBase.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<VariableBase.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        emit_changed(): void;

        emit_dropped(): void;

        /**
         * @param err 
         */
        emit_error(err: string): void;
    }


    namespace Variable {
        // Signal signatures
        interface SignalSignatures extends VariableBase.SignalSignatures {
            "notify::value": (pspec: GObject.ParamSpec) => void;
        }

        // Constructor properties interface
        interface ConstructorProps extends VariableBase.ConstructorProps {
            value: GObject.Value | any;
        }
    }

    /**
     * @gir-type Class
     * @deprecated
     */
    class Variable extends VariableBase {
        static $gtype: GObject.GType<Variable>;

        // Properties
        get value(): unknown;
        set value(val: GObject.Value | any);

        /**
         * Compile-time signal type information.
         *
         * This instance property is generated only for TypeScript type checking.
         * It is not defined at runtime and should not be accessed in JS code.
         * @internal
         */
        $signals: Variable.SignalSignatures;

        // Constructors
        constructor(properties?: Partial<Variable.ConstructorProps>, ...args: any[]);

        _init(...args: any[]): void;

        static ["new"](init: GObject.Value | any): Variable;

        // Conflicted with AstalIO.VariableBase.new
        static ["new"](...args: never[]): any;

        // Signals
        /** @signal */
        connect<K extends keyof Variable.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Variable.SignalSignatures[K]>): number;
        connect(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        connect_after<K extends keyof Variable.SignalSignatures>(signal: K, callback: GObject.SignalCallback<this, Variable.SignalSignatures[K]>): number;
        connect_after(signal: string, callback: (...args: any[]) => any): number;

        /** @signal */
        emit<K extends keyof Variable.SignalSignatures>(signal: K, ...args: GObject.GjsParameters<Variable.SignalSignatures[K]> extends [any, ...infer Q] ? Q : never): void;
        emit(signal: string, ...args: any[]): void;

        // Methods
        /**
         * @param interval 
         * @param exec 
         * @param transform 
         */
        poll(interval: number, exec: string, transform: GObject.Closure | null): Variable;

        /**
         * @param interval 
         * @param execv 
         * @param transform 
         */
        pollv(interval: number, execv: string[], transform: GObject.Closure | null): Variable;

        /**
         * @param interval 
         * @param fn 
         */
        pollfn(interval: number, fn: GObject.Closure): Variable;

        /**
         * @param exec 
         * @param transform 
         */
        watch(exec: string, transform: GObject.Closure | null): Variable;

        /**
         * @param execv 
         * @param transform 
         */
        watchv(execv: string[], transform: GObject.Closure | null): Variable;

        start_poll(): void;

        start_watch(): void;

        stop_poll(): void;

        stop_watch(): void;

        is_polling(): boolean;

        is_watching(): boolean;

        get_value(): unknown;

        /**
         * @param value 
         */
        set_value(value: GObject.Value | any): void;
    }


    /**
     * @gir-type Alias
     */
    type DaemonClass = typeof Daemon;

    /**
     * @gir-type Struct
     */
    abstract class DaemonPrivate {
        static $gtype: GObject.GType<DaemonPrivate>;
    }


    /**
     * @gir-type Alias
     */
    type ProcessClass = typeof Process;

    /**
     * @gir-type Struct
     */
    abstract class ProcessPrivate {
        static $gtype: GObject.GType<ProcessPrivate>;
    }


    /**
     * @gir-type Alias
     */
    type TimeClass = typeof Time;

    /**
     * @gir-type Struct
     */
    abstract class TimePrivate {
        static $gtype: GObject.GType<TimePrivate>;
    }


    /**
     * @gir-type Alias
     */
    type VariableBaseClass = typeof VariableBase;

    /**
     * @gir-type Struct
     */
    abstract class VariableBasePrivate {
        static $gtype: GObject.GType<VariableBasePrivate>;
    }


    /**
     * @gir-type Alias
     */
    type VariableClass = typeof Variable;

    /**
     * @gir-type Struct
     */
    abstract class VariablePrivate {
        static $gtype: GObject.GType<VariablePrivate>;
    }


    /**
     * @gir-type Alias
     */
    type ApplicationIface = typeof Application;

    namespace Application {
        /**
         * Interface for implementing Application.
         * Contains only the virtual methods that need to be implemented.
         */
        interface Interface {

            // Virtual methods
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
             * @param request 
             * @param conn 
             * @virtual
             */
            vfunc_request(request: string, conn: Gio.SocketConnection): void;

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


        // Constructor properties interface
        interface ConstructorProps extends GObject.Object.ConstructorProps {
            instance_name: string;
            instanceName: string;
        }
    }

    export interface ApplicationNamespace {
        $gtype: GObject.GType<Application>;
        prototype: Application;
    }
    /**
     * This interface is used internally in Astal3 and Astal4, not meant for public usage.
     * @gir-type Interface
     * @deprecated
     */
    interface Application extends GObject.Object, Application.Interface {

        // Properties
        get instance_name(): string;
        set instance_name(val: string);

        get instanceName(): string;
        set instanceName(val: string);

        // Methods
        quit(): void;

        inspector(): void;

        /**
         * @param window 
         */
        toggle_window(window: string): void;

        acquire_socket(): void;

        /**
         * @param request 
         * @param conn 
         */
        request(request: string, conn: Gio.SocketConnection): void;

        get_instance_name(): string;

        /**
         * @param value 
         */
        set_instance_name(value: string): void;
    }


    export const Application: ApplicationNamespace & {
        new (): Application; // This allows `obj instanceof Application`
    };

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

export default AstalIO;

}

declare module 'gi://AstalIO' {
    import AstalIO01 from 'gi://AstalIO?version=0.1';
    export default AstalIO01;
}
// END
