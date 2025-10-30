package main

import (
	"context"
	"fmt"
	"syscall"
)

var (
	user32         = syscall.NewLazyDLL("user32.dll")
	procKeybdEvent = user32.NewProc("keybd_event")
)

const (
	VK_MENU         = 0x12
	VK_TAB          = 0x09
	VK_CONTROL      = 0x11
	VK_V            = 0x56
	KEYEVENTF_KEYUP = 0x0002
)

func (a *App) PressAltTab() {
	procKeybdEvent.Call(uintptr(VK_MENU), 0, 0, 0)
	procKeybdEvent.Call(uintptr(VK_TAB), 0, 0, 0)
	procKeybdEvent.Call(uintptr(VK_TAB), 0, KEYEVENTF_KEYUP, 0)
	procKeybdEvent.Call(uintptr(VK_MENU), 0, KEYEVENTF_KEYUP, 0)
}

func (a *App) PressCtrlV() {
	procKeybdEvent.Call(uintptr(VK_CONTROL), 0, 0, 0)
	procKeybdEvent.Call(uintptr(VK_V), 0, 0, 0)
	procKeybdEvent.Call(uintptr(VK_V), 0, KEYEVENTF_KEYUP, 0)
	procKeybdEvent.Call(uintptr(VK_CONTROL), 0, KEYEVENTF_KEYUP, 0)
}

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}
